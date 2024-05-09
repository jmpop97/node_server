const {UserPermission} = require('../models')
const { Op } = require("sequelize");

const error_message = require("../cache_DB/error_message")

async function createPermission(body,type){
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
    create: createPermission
}