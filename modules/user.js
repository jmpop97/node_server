const crypto = require('crypto');
const models = require('../models')
const error_message=require('../cache_DB/error_message')
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const { response } = require('express');
const {Email}=require('../modules/send_email')

class User{
    constructor(params){
        let {id,password,email,state,authNames,birthday,intro,key}=params
        this.id=id;
        this.password=password;
        this.email=email;
        this.state=state;
        this.authNames=authNames;
        this.birthday=birthday
        this.intro=intro
        this.key=key
        if(!authNames){
            this.authNames=["User"]
        }
    }
    async logUp(verify=false){
        let {id,password,email,authNames,birthday,intro,key}=this
        if (verify){
            let email_verify=await new Authenfication({email,key,type:"createUser"}).verify(true)
            if (email_verify>=0){
                return error_message.get(33)
            }            
        }
        let res
        let hashpassword = await new Password().hashPassword(id,password)
        let create_id = {
            userId: id,
            password: hashpassword,
            email: email,
            UserInfo:{
                userId:id,
                birthday:birthday,
                intro:intro
            },
        };
        res={ "response": 200 };
        await models.User.create(create_id,{include:[models.UserInfo]})
        .catch(error => {
            this.error=error
            res=error_message.get(9,this)
        });
        if (res.response==200){
            let add_permissions=authNames?.map(perm=>{return {userId:id,authName:perm}})
            await models.Permission_User.bulkCreate(add_permissions)
            .catch((error)=>{
                this.error=error
                res=error_message.get(8,this)})
            }
        return res
    }
    async logIn(ip){
        let {id,password}=this
        let res
        if (!id || !password){
            res= error_message.get(10,{id})
            return res
        }
        
        let hashpassword = await new Password().hashPassword(id,password)
        await models.User.findOne(
            {
                where:{userId:id},
                include:[
                {
                    model:models.Permission,
                    through:{
                        attributes:[]
                    },
                    attributes:["authName"]

                },
            ]
        })
        .then((comment) => {
            if (comment.state==="Deactivate"){
                res=error_message.get(30,{id});
            }
            else if (hashpassword===comment.password){
                comment.ip=ip
                const user_data = new JWT().sign(comment)
                .then(user_data=>
                    res={ "response": 200, "user": user_data}
                )
            }
            else{
                res=error_message.get(11,{id});
            }        
        })
        .catch(error => {
            res=error_message.get(12,{id,error});
        });
        return res
    }
    async patch(){
        let res={response:200,at:["password","email","authName"]}
        if (this.password){
            this.password=await new Password().hashPassword(this.id,this.password)
        }
        else{
            delete this.password
        }
        await models.User.update(this,{where:{userId:this.id}})
        .catch((error)=>{
            delete this.password
            this.error=error
            res=error_message.get(28,this)
        }
        )
        return res
    }
    async deactivate(id){
        let res={response:200}
        await models.User.update(
            {
                state:"Deactivate"
            },
            {
                where:{userId:id}
            }
            )
        .catch((error)=>{
            this.error=error
            res=error_message.get(27,id)
        }
        )
        return res
    }
}


class LocalUser extends User{
    constructor(params){
        params.id="Local_"+params.id
        super(params)
    }
}


class SocialUser extends User{
    
    constructor(params){
        let {type,email}=params
        params.id=type+"_"+email;
        params.password="password"
        super(params)
    }
    async logIn(ip){
        let res={response:200}
        let {id,password}=this
        let hashpassword = await new Password().hashPassword(id,password)
        await models.User.findOne(
            {
                where:{userId:id},
                include:[
                {
                    model:models.Permission,
                    through:{
                        attributes:[]
                    },
                    attributes:["authName"]
                },
            ]
        })
        .then((comment) => {
            comment.ip=ip
            if (comment.state==="Deactivate"){
                res=error_message.get(30,{id});
            }
            const user_data = new JWT().sign(comment)
                .then(user_data=>
                    res={ "response": 200, "user": user_data}
                )
        })
        .catch(async (error) => {
            await super.logUp()
            res= await super.logIn(ip)
        });
        return res
    }

}


class UserInfo{
    constructor(params){
        let{id,birthday,intro}=params
        this.id=id
        this.birthday=birthday
        this.intro=intro
    }
    async patch(){
        let res={response:200,at:["birthday","intro"]}
        await models.UserInfo.update(this,{where:{userId:this.id}})
        .catch((error)=>{
            delete this.password
            this.error=error
            res=error_message.get(29,this)
        }
        )
        return res
    }
}


class Password{
    async hashPassword(id,password){
        return crypto.pbkdf2Sync(password,
            process.env.PASSWORD_SECRET_STRING + id + process.env.PASSWORD_SECRET_STRING,
            Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    }
}

class JWT{
    async sign(user){
        const payload = {
            userPk:user.userPk,
            userId: user.userId,
            email: user.email,
            state: user.Status,
            auth: user.Permissions.map(entity=>entity.get("authName")),
            ip:user.ip
        };
        //future: need user refresh token
        const result = {
            token: jwt.sign(payload,process.env.PASSWORD_SECRET_STRING,{expiresIn:process.env.JWT_REFRESH_EXPIRATION}),
            refreshToken: randToken.uid(256)
        };
        return result;
    }
    async verify(auth){
        let [token,_]=["",""]
        if (auth){
             [_,token]=auth.split("Bearer ")
        }
        if (!token){
            return error_message.get(1,auth)
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.PASSWORD_SECRET_STRING);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return error_message.get(2,auth)
            } else if (err.name === 'JsonWebTokenError') {
                return error_message.get(3,auth)
            } else{
                return error_message.get(4,auth)
            }
        }
        return decoded;
    }
}

class Authenfication{
    constructor(params){
        let {type,email,key}=params
        this.type=type
        this.email=email
        this.key=key
    }
    async existence(){
        if (!this.email){
            return
        }
        this.auth=await models.Authenfication.findOne({
            where:{
                // type:this.type,
                email:this.email
            }
        })
    }
    async AuthenficationCreate(){
        await this.existence()
        if (this.auth){
            return error_message.get(31)
        }
        let title="서비스 이메일 확인"
        let {email,type}=this
        let key = crypto.randomBytes(20).toString('hex')
        let auth = await models.Authenfication.create({
            type,email,key
        })
        new Email({email,form:"normal_form",body:{key}})
        setTimeout(this.deleteLog,60*60000,auth)
        return error_message.get(0)
    }

    async verify(del=false){
        // return left_count, -1:true
        await this.existence()
        let {auth,key}=this
        if (!auth){
            return 0
        }
        if(auth.count>5){
            return 0
        }
        else if (auth.key==key){
            if (del){
            auth.destroy()
            }
            return -1
        }
        else{
            this.auth.increment('count')
            return 5-auth.count
        }
    }

    async deleteLog(auth){
        auth.destroy()
    }
}

module.exports={
    User,
    LocalUser,
    SocialUser,
    JWT,
    UserInfo,
    Authenfication
}