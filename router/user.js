let express = require("express")
const router = express.Router();

const { Op } = require('sequelize');
const models = require("../models")

const jwt = require("../modules/jwt")
const search_user =require('../modules/user_search')
const user_passward = require('../modules/user_password')
const user_update = require('../modules/user_update')
router.post("",(req,res)=>{
    //createUser
    let {id,password,email} = req.body;
    user_passward.logUp(id,password,email,res)
})

router.get("",(req,res)=>{
    //log in
    let {id,password} = req.body;
    user_passward.logIn(id,password,res)
})


router.get("/:id",(req,res)=>{
    //UserQuery
    let {type,id,state}=req.body
    jwt.verify(req.headers.authorization)
    .then((log_in_user)=>{
    if (log_in_user.response){
        res.send(log_in_user)
        return
    }
    switch(type){
        default:
            search_user.choice(log_in_user.id,res)
            return
        case '*':
        case 'all':
            search_user.all(res)
            return
        case 'choice':
            search_user.choice(id,res)
            return
        case 'search_init':
            search_user.search_init(id,res)
            return
        case 'search_include':
            search_user.search_include(id,res)
            return
        case 'state':
            search_user.state(state,res)
            return
        }
    })
})


router.patch("/",(req,res)=>{
    // id change danger
    let {type,id}=req.body
    jwt.verify(req.headers.authorization)
    .then((log_in_user)=>{
    if (log_in_user.response){
        res.send(log_in_user)
        return
    }
    user_update.patch(log_in_user.id,req.body, res);
    })
})


router.delete("/:id",(req,res)=>{
    // id change danger
        deleteUserId(res);
})




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