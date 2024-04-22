let express = require("express")
const models = require("../models")
const router = express.Router();
const { Op } = require('sequelize');
const crypto = require('crypto');
const jwt = require("jsonwebtoken")
require('dotenv').config();
console.log(process.env.PASSWORD_SECRET)

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
    let body = req.body;
    let hashpassword = crypto.pbkdf2Sync(body.password,
        process.env.PASSWORD_SECRET_STRING + body.id + process.env.PASSWORD_SECRET_STRING,
        Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    models.User.findAll({
        attributes:["id","password"],
        where: {
            id:body.id
        }
    })
    .then((comment) => {
        console.log(hashpassword)
        console.log(comment)
        if (hashpassword===comment[0].password){
            res.send({ "response": 200, "user": jwt.sign({"email":body.id},"our_secre") });
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
    let body = req.body;
    let hashpassword = crypto.pbkdf2Sync(body.password,
        process.env.PASSWORD_SECRET_STRING + body.id + process.env.PASSWORD_SECRET_STRING,
        Number(process.env.PASSWORD_SECRET), 64, 'sha512').toString('hex');
    let create_id = {
        "id": body.id,
        "password": hashpassword,
        "email": body.email
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
    models.User.findAll({
        where: {
            id: req.params.id
        }
    })
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