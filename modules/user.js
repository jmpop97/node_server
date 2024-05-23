const crypto = require('crypto');
const models = require('../models')
const error_message=require('../cache_DB/error_message')

class User{
    constructor(id,password,email,authName="User"){
        this.id=id;
        this.password=password;
        this.email=email;
        this.authName=authName
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
            res= error_message.get(10,{id,password})
            return res
        }
        
        let hashpassword = await module.exports.hashPassword(id,password)
        await User.findAll({
            attributes:["id","password","state","email"],
            where: {
                id:id
            },
            include:[{
                model:Status,
                attributes:['stateName']
        },
        {
            attributes:['authName'],
            model:Permission,
            through: {
                attributes: [],
              },
        }]
        })
        .then((comment) => {
            if (hashpassword===comment[0].password){
                const user_data = jwt.sign(comment[0])
                .then(user_data=>
                    res={ "response": 200, "user": user_data}
                )
            }
            else{
                res=error_message.get(11,{id,password});
            }        
        })
        .catch(error => {
            res=error_message.get(12,{id,password,error});
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
        super("Social"+id,password,email,authName)
    }
}


class Password{
    async hashPassword(id,password){
        return crypto.pbkdf2Sync(password,
            process.env.PASSWORD_SECRET_STRING + id + process.env.PASSWORD_SECRET_STRING,
            Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    }
}



module.exports={
    User,
    LocalUser
}