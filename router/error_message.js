let express = require("express")
const router = express.Router();
const jwt = require("../modules/jwt")
const cache_error_message = require("../cache_DB/error_message")
const {error_message} = require("../models")


router.get("",async(req,res)=>{
    //search
    let log_in_user = await jwt.verify(req.headers.authorization)
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    if (!log_in_user.auth.includes("Admin")){
        return res.send({response:401.1})
    }
    let {at}=req.body
    x = await cache_error_message.search(at)
    res.send(x)
})


router.post("/DB",async(req,res)=>{
    let log_in_user = await jwt.verify(req.headers.authorization)
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    if (!log_in_user.auth.includes("Admin")){
        return res.send({response:401.1})
    }
    x = await cache_error_message.setAll()
    res.send(x)
})


router.patch("/DB",async(req,res)=>{
    let {id}=req.body.id
    let log_in_user = await jwt.verify(req.headers.authorization)
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    if (!log_in_user.auth.includes("Admin")){
        return res.send({response:401.1})
    }
    if (id){
    x = await cache_error_message.patch(id)
    }
    res.send(x)
})

module.exports = router