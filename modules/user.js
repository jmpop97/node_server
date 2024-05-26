const crypto = require('crypto');
const models = require('../models')
const error_message=require('../cache_DB/error_message')
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

class User{
    constructor(id,password,email,authName="User"){
        this.id=id;
        this.password=password;
        this.email=email;
        this.authName=authName;
    }
    async logUp(){
        let {id,password,email,authName}=this
        let res
        let hashpassword = await new Password().hashPassword(id,password)
        let create_id = {
            id: id,
            password: hashpassword,
            email: email,
            UserInfo:{userId:id},
        };
        res={ "response": 200 };
        await models.User.create(create_id,{include:[models.UserInfo]})
        .catch(error => {
            res=error_message.get(9,{id,password,email,authName,error})
        });
        if (res.response==200){
            await models.UserPermission.create({userId:id,authName:authName})
            .catch((error)=>{
                res=error_message.get(8,{id,authName,error})})
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
}
class LocalUser extends User{
    constructor(id,password,email,authName="User"){
        super("Local"+id,password,email,authName)
    }
}

class SocialUser extends User{
    constructor(id,password,email,authName="User"){
        super("Social"+email,"password",email,authName)
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
    LocalUser,
    SocialUser,
    JWT
}