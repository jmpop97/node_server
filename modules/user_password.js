const crypto = require('crypto');
const {User,UserInfo} = require('../models')
const jwt = require('../modules/jwt')
module.exports = {
    logUp: async(id,password,email,res)=>{
        let hashpassword = await module.exports.hashPassword(id,password)
        let create_id = {
            "id": id,
            "password": hashpassword,
            "email": email
        };
        User.create(create_id)
        .then(_ => {
        console.log("data is created!");
        res.send({ "response": 200 });
        }).then(()=>
        UserInfo.create({"userId":id})
        )
        .catch(error => {
                console.log({"error":error});
                res.send({
                    "response": 400,
                });
        });
    },
    logIn: async(id,password,res)=>{
        if (!id || !password){
            res.send({"response":400, "error": "wrong input"})
            return
        }
        
        let hashpassword = await module.exports.hashPassword(id,password)
        User.findAll({
            attributes:["id","password","state","email"],
            where: {
                id:id
            }
        })
        .then((comment) => {
            if (hashpassword===comment[0].password){
                const user_data = jwt.sign(comment[0])
                .then(user_data=>
                    res.send({ "response": 200, "user": user_data})
                )
            }
            else{
                res.send({ "response": 400, "error":"잘못된 비밀번호"});
            }        
            console.log("data is read!");
        })
        .catch(error => {
            console.log({"error":error});
            res.send({
                "response": 400,
                "error": error
            });
        });
    },
    hashPassword: async(id,password)=>{
        return crypto.pbkdf2Sync(password,
            process.env.PASSWORD_SECRET_STRING + id + process.env.PASSWORD_SECRET_STRING,
            Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    },
}
    
