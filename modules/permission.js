const {UserPermission,PermissionAPI} = require('../models')
const { Op } = require("sequelize");

const error_message = require("../cache_DB/error_message")
const permissionAPI = require("../cache_DB/permissionAPI")

async function PermissionAPICheck(api,user_perm){
    perms=await permissionAPI.get(api)
    if (!perms){
        return undefined
    }
    if (perms[0]=='All'){
        return true
    }
    for (i in user_perm){
        if (perms.includes(user_perm[i])){
            return true
        }
    }
    return false
}

async function createPermissionAPI(body,type){
    let response
    let add_perm=body.permissions
    let api =await PermissionAPI.findAll({
        attributes:['authName'],
        where:{apiId:body.apiId}
    })
    api=api.map(entity=>entity.authName)
    let all=[]; let add=[];
    for (i in add_perm){
        let b = add_perm[i]
        let _b={
            apiId:body.apiId,authName:b
        }
        if(api.includes(b)){
    }
        else{
            add.push(_b)
        }
        all.push(b)
    }
    if(type=="update"){
        if (all!=[]){
        await PermissionAPI.destroy(
            {where:{
                apiId:body.apiId,
                authName:{
                    [Op.notIn]:all
                }
                }},
            )
            .then((comment) => {
                response={response:200}
            })
            .catch((error)=>{
                response=error_message.get(22,all) 
            })
        }
    }
    await PermissionAPI.bulkCreate(
    add,
    )
    .then((comment) => {
        response={response:200}
    })
    .catch((error)=>{
        response=error_message.get(23,add)
    })
    return response
}


async function createUserPermission(body,type){
    let response
    let add_perm=body.permission
    let user =await UserPermission.findAll({
        attributes:['authName'],
        where:{userId:body.id}
        })
        user=user.map(entity=>entity.authName)
    let all=[]; let add=[];
    for (i in add_perm){
        let b = add_perm[i]
        let _b={
            userId:body.id,authName:b
        }
        if(user.includes(b)){
    }
        else{
            add.push(_b)
        }
        all.push(b)
    }
    if(type=="update"){
        if (all!=[]){
            await UserPermission.destroy(
                {where:{
                    userId:body.id,
                    authName:{
                        [Op.notIn]:all
                    }
                    }},
                )
                .then((comment) => {
                    response={response:200}
                })
                .catch((error)=>{
                    response=error_message.get(5) 
                })
            }
        }
    await UserPermission.bulkCreate(
    add,
    )
    .then((comment) => {
        response={response:200}
    })
    .catch((error)=>{
        response=error_message.get(6)
    })
    return response
}
module.exports = {
    PermissionAPICheck,
    createUserPermission,
    createPermissionAPI,
}