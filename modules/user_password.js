const crypto = require('crypto');
const {User,UserInfo,Permission,Status,UserPermission} = require('../models')
const jwt = require('../modules/jwt')
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
            console.log("data is created!");
            res={ "response": 200 };
        })
        .catch(error => {
                console.log({"error":error});
                res={
                    "response": 400,
                };
        });
        return res
    },
    logIn: async(id,password)=>{
        let res
        if (!id || !password){
            res= {"response":400, "error": "wrong input"}
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
                res={ "response": 400, "error":"잘못된 비밀번호"};
            }        
            console.log("data is read!");
        })
        .catch(error => {
            console.log({"error":error});
            res={
                "response": 400,
                "error": error
            };
        });
        return res
    },
    hashPassword: async(id,password)=>{
        return crypto.pbkdf2Sync(password,
            process.env.PASSWORD_SECRET_STRING + id + process.env.PASSWORD_SECRET_STRING,
            Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    },
}
    
