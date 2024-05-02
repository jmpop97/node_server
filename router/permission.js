let express = require("express")
const router = express.Router();
const jwt = require("../modules/jwt")
const permission = require("../modules/permission")

router.post("",async(req,res)=>{
    let {type,permissions}=req.body
    let log_in_user = await jwt.verify(req.headers.authorization)
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    if (!log_in_user.auth.includes("Admin")){
        return res.send({response:401.1})
    }
    response = await permission.create(log_in_user,permissions)
    return res.send(response)
})

module.exports = router