const crypto = require('crypto');
const {User,UserInfo,Permission,Status,UserPermission} = require('../models')
const jwt = require('../modules/jwt')
const error_message=require('../cache_DB/error_message')
module.exports = {
    
    logUp: async(id,password,email,authId=2)=>{
        let res
        let hashpassword = await module.exports.hashPassword(id,password)
        let create_id = {
            id: id,
            password: hashpassword,
            email: email,
            UserInfo:{userId:id},
        };
        await User.create(create_id,{include:[UserInfo]})
        .then(_ => {
            //need fix-combine User&UserPermission
            UserPermission.create({userId:id,authId:authId})
            .catch((error)=>{error_message.get(8,{id,authId,error})})
            res={ "response": 200 };
        })
        .catch(error => {
            error_message.get(9,{id,password,email,authId,error})
        });
        return res
    },
    logIn: async(id,password)=>{
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
    },
    hashPassword: async(id,password)=>{
        return crypto.pbkdf2Sync(password,
            process.env.PASSWORD_SECRET_STRING + id + process.env.PASSWORD_SECRET_STRING,
            Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    },
}
    
