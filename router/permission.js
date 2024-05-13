let express = require("express")
const router = express.Router();
const Permission = require("../modules/permission")
const error_message=require('../cache_DB/error_message')


router.post("/user",async(req,res)=>{
    let {id,permissions,type}=req.body
    let body={
        id:id,
        permission:permissions
        }
    if (!body.id){
        return res.send(await error_message.get(21))
    }
    response = await Permission.createUserPermission(body,type)
    return res.send(response)
})

router.post("/api",async(req,res)=>{
    let {api,permissions,type}=req.body
    let body={
        apiId:api,
        permissions:permissions
        }
    if (!body.apiId){
        return res.send(await error_message.get(21))
    }
    response = await Permission.createPermissionAPI(body,type)
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