let express = require("express")
const models = require("../models")
const router = express.Router();
const { Op } = require('sequelize');
const crypto = require('crypto');
const jwt = require("../modules/jwt")
const search_user =require('../modules/search_user')

router.post("",(req,res)=>{
    createUser(req,res);
})

// router.get("",(req,res)=>{
//     getUserTable(req,res);
// })


router.get("",(req,res)=>{
    logIn(req, res);
})


router.get("/:id",(req,res)=>{
    getUserQuery(req, res);
})


router.patch("/:id",(req,res)=>{
    // id change danger
        patchUserId(req, res);
})


router.delete("/:id",(req,res)=>{
    // id change danger
        deleteUserId(res);
})


function logIn(req, res) {
    let {id,password} = req.body;
    if (!id || !password){
        res.send({"response":400, "error": "wrong input"})
        return
    }
    let hashpassword = crypto.pbkdf2Sync(password,
        process.env.PASSWORD_SECRET_STRING + id + process.env.PASSWORD_SECRET_STRING,
        Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    models.User.findAll({
        attributes:["id","password"],
        where: {
            id:id
        }
    })
    .then((comment) => {
        if (hashpassword===comment[0].password){
            const user_data = jwt.sign(comment[0]).then(user_data=>
                res.send({ "response": 200, "user": user_data})
            )
        }
        else{
            res.send({ "response": 400, "error":"잘못된 비밀번호"});
        }        
        console.log("data is read!");
    })
    .catch(error => {
        console.log("error");
        res.send({
            "response": 400,
            "error": error
        });
    });
}

function createUser(req,res) {
    let {id,password,email} = req.body;
    let hashpassword = crypto.pbkdf2Sync(password,
        process.env.PASSWORD_SECRET_STRING + id + process.env.PASSWORD_SECRET_STRING,
        Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    let create_id = {
        "id": id,
        "password": hashpassword,
        "email": email
    };
    models.User.create(create_id)
        .then(_ => {
            console.log("data is created!");
            res.send({ "response": 200 });
        })
        .catch(error => {
            console.log({"error":error});
            res.send({
                "response": 400,
                "error": error
            });
        });
}

function getUserTable(req,res) {
    models.User.findAll({})
        .then((comment) => {
            console.log("data is read!");
            res.send({ "response": 200, "user": comment });
        })
        .catch(error => {
            console.log({"error":error});
            res.send({
                "response": 400,
                "error": error
            });
        });
}

function getUserQuery(req, res) {
    var log_in_user=jwt.verify(req.headers.authorization)

    if (log_in_user.response){
        res.send(log_in_user)
        return
    }
    switch(req.body.type){
        default:
            search_user.all(res)
            return
        case 'choice':
            search_user.choice(res,req.body.id)
            return
        case 'search_init':
            search_user.search_init(res,req.body.id)
            return
        case 'search_include':
            search_user.search_include(res,req.body.id)
    }
}

function patchUserId(req, res) {
    models.User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then((comment) => {
            console.log("data is update");
            res.send({ "response": 200, "user": comment });
        })
        .catch(error => {
            console.log({"error":error});
            res.send({
                "response": 400,
                "error": error
            });
        });
}

function deleteUserId(res) {
    models.User.destroy({
        where: {
            id: { [Op.gt]: 30 }
        }
    })
        .then((comment) => {
            console.log("data is delete");
            res.send({ "response": 200, "user": comment });
        })
        .catch(error => {
            console.log({"error":error});
            res.send({
                "response": 400,
                "error": error
            });
        });
}

module.exports = router