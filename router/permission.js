let express = require("express")
const router = express.Router();
const Permission = require("../modules/permission")
const error_message=require('../cache_DB/error_message')
const permissionAPI = require("../cache_DB/permissionAPI")

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


router.get("/api/DB",async(req,res)=>{
    let {api}=req.body
    x = await permissionAPI.search(api)
    res.send(x)
})


router.post("/api/DB",async(req,res)=>{
    x = await permissionAPI.setAll()
    res.send(x)
})


router.patch("/api/DB",async(req,res)=>{
    let {api}=req.body
    x = await permissionAPI.patch(api)
    res.send(x)
})

module.exports = router