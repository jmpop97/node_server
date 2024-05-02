let express = require("express")
const router = express.Router();
const jwt = require("../modules/jwt")
const Permission = require("../modules/permission")

router.post("",async(req,res)=>{
    let {id,permission,type}=req.body
    let body={
        id:id,
        permission:permission
        }
    let log_in_user = await jwt.verify(req.headers.authorization)
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    if (!log_in_user.auth.includes("Admin")){
        return res.send({response:401.1})
    }
    response = await Permission.create(body,type)
    return res.send(response)
})

module.exports = router