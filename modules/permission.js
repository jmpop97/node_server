const {UserPermission} = require('../models')
const { Op } = require("sequelize");
//need cache data
const perms={
    "Admin":1,
    "User":2}

async function createPermission(body,type){
    let response
    let add_perm=body.permission
    let user =await UserPermission.findAll({
        attributes:['authId'],
        where:{userId:body.id}
        })
        user=user.map(entity=>entity.authId)
    let [all,add]=add_perm.reduce((a,b)=>
        {
            b=perms[b]
            let _b={
                userId:body.id,authId:b
            }
            if(user.includes(b)){
        }
            else{
                a[1].push(_b)
            }
            a[0].push(b)
            return a
        }
        ,[[],[]])


    if(type=="update"){
        await UserPermission.destroy(
            {where:{
                userId:body.id,
                authId:{
                    [Op.notIn]:all
                }
                }},
            )
            .then((comment) => {
                response={response:200}
            })
            .catch((error)=>{
                console.log({"path":"modulers/permission.createPermission",
            error:error})
                response={response:200}   
            })
        }

    await UserPermission.bulkCreate(
    add,
    )
    .then((comment) => {
        response={response:200}
    })
    .catch((error)=>{
        console.log({"path":"modulers/permission.createPermission",
    error:error})
        response={response:200}   
    })
   
    return response
}
module.exports = {
    create: createPermission
}