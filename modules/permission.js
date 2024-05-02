const {UserPermission} = require('../models')
//need cache data
const perms={
    "Admin":1,
    "User":2}

async function createPermission(user,add_perm){
    let response
    let [create,update]=add_perm.reduce((a,b)=>
        {
            let _b={userId:user.id,authId:perms[b]}
                if(user.auth.includes(b)){
                a[0].push(_b)
        }
            else{
                a[1].push(_b)
            }
            return a
        }
        ,[[],[]])
    console.log(create)
    await UserPermission.bulkCreate(
    create,
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