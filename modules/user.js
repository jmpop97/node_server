const crypto = require('crypto');
const models = require('../models')
const error_message=require('../cache_DB/error_message')
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const { response } = require('express');

class User{
    constructor(params){
        let {id,password,email,state,authNames,birthDay,intro}=params
        this.id=id;
        this.password=password;
        this.email=email;
        this.state=state;
        this.authNames=authNames;
        this.birthDay=birthDay
        this.intro=intro
    }
    async logUp(){
        let {id,password,email,authNames,birthDay,intro}=this
        let res
        let hashpassword = await new Password().hashPassword(id,password)
        let create_id = {
            id: id,
            password: hashpassword,
            email: email,
            UserInfo:{
                userId:id,
                birthDay:birthDay,
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
    async logIn(){
        let {id,password}=this
        let res
        if (!id || !password){
            res= error_message.get(10,{id})
            return res
        }
        
        let hashpassword = await new Password().hashPassword(id,password)
        await models.User.findByPk(
            id,
            {
                include:[
                {
                    model:models.Permission,
                    through:{
                        attribute:[]
                    }
                },
            ]
        })
        .then((comment) => {
            if (hashpassword===comment.password){
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
        await models.User.update(this,{where:{id:this.id}})
        .catch((error)=>{
            delete this.password
            this.error=error
            res=error_message.get(28,this)
        }
        )
        return res
    }
    async disactive(){
        let {id} = this
        await models.User.update(
            {
                state:"Deactivate"
            },
            {
                where:{id}
            }
            )
        .catch((error)=>
            res=error_message.get(27,{id,error}

            ))
        res={response:200}
    }
}


class LocalUser extends User{
    constructor(params){
        params.id="Local"+params.id
        super(params)
    }
}


class SocialUser extends User{
    
    constructor(params){
        params.id="Social"+params.id;
        params.password="password"
        super(params)
    }
}


class UserInfo{
    constructor(params){
        let{id,birthDay,intro}=params
        this.id=id
        this.birthDay=birthDay
        this.intro=intro
    }
    async patch(){
        let res={response:200,at:["birthday","intro"]}
        console.log(this)
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
            id: user.id,
            email: user.email,
            state: user.Status,
            auth: user.Permissions.map(entity=>entity.get("authName"))
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

module.exports={
    User,
    LocalUser,
    SocialUser,
    JWT,
    UserInfo
}