let express = require("express")
const router = express.Router();
const jwt = require("../modules/jwt")
const Permission = require("../modules/permission")
// const permissionDB = require("../cache_DB/permission")
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
    response = await Permission.createUserPermission(body,type)
    return res.send(response)
})


// router.post("/DB",async(req,res)=>{
//     let {authName}=req.body
//     let log_in_user = await jwt.verify(req.headers.authorization)
//     if (log_in_user.response){
//         return res.send(log_in_user)
//     }
//     if (!log_in_user.auth.includes("Admin")){
//         return res.send({response:401.1})
//     }
//     x = await permissionDB.setAll()
//     res.send(x)
// })


// router.patch("/DB",async(req,res)=>{
//     let {authName}=req.body
//     let log_in_user = await jwt.verify(req.headers.authorization)
//     if (log_in_user.response){
//         return res.send(log_in_user)
//     }
//     if (!log_in_user.auth.includes("Admin")){
//         return res.send({response:401.1})
//     }
//     x = await permissionDB.patch(req.body.authName)
//     res.send(x)
// })

module.exports = router