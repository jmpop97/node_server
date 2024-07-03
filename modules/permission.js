const models = require('../models')
const { Op } = require("sequelize");

const error_message = require("../cache_DB/error_message")
const permissionAPI = require("../cache_DB/permissionAPI")

async function PermissionAPICheck(api,user_perm){
    // return true
    perms=await permissionAPI.get(api)
    if (!perms){
        return true
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
    let api =await models.Permission_API.findAll({
        attributes:['authName'],
        where:{apiName:body.apiName}
    })
    api=api.map(entity=>entity.authName)
    let all=[]; let add=[];
    for (i in add_perm){
        let b = add_perm[i]
        let _b={
            apiName:body.api,authName:b
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
        await models.Permission_API.destroy(
            {where:{
                apiName:body.apiName,
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
    await models.Permission_API.bulkCreate(
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


async function createPermission_User(body,type){
    let response
    let add_perm=body.permissions
    let user =await models.Permission_User.findAll({
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
            await models.Permission_User.destroy(
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
    await models.Permission_User.bulkCreate(add)
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
    createPermission_User,
    createPermissionAPI,
}