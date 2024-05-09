let express = require("express")
const router = express.Router();

const { Op } = require('sequelize');
const models = require("../models")

const jwt = require("../modules/jwt")
const search_user =require('../modules/user_search')
const user_passward = require('../modules/user_password')
const user_update = require('../modules/user_update');
const user_search = require("../modules/user_search");
router.post("",async (req,res)=>{
    //createUser
    let {id,password,email} = req.body;
    let response=await user_passward.logUp(id,password,email)
    return res.send(response)
})

router.get("",async(req,res)=>{
    //log in
    let {id,password} = req.body;
    let response = await user_passward.logIn(id,password)
    res.send(response)
})


router.get("/:id",async (req,res)=>{
    //UserQuery
    let {type,id}=req.body
    let log_in_user =await jwt.verify(req.headers.authorization)
    let body={"id":id,"log_in_user":log_in_user.id}
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    let response=await user_search.search(type,body)
    return res.send(response)
})

router.patch("/",async (req,res)=>{
    let {password,email,birthDay}=req.body
    let log_in_user =await jwt.verify(req.headers.authorization)
    let body={
        id:log_in_user.id,
        password:password,
        email:email,
        birthDay:birthDay}
    if (log_in_user.response){
        return res.send(body)
    }
    let response = await user_update.patch(body)
    return res.send(response)

})


router.delete("/",async(req,res)=>{
    let log_in_user =req.log_in_user
    let body={
        id:log_in_user.id,
        }
    let response = await user_update.delete(body,del=true)
    return res.send(response)
})


module.exports = router