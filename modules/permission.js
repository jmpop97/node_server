const {UserPermission} = require('../models')
//need cache data
const perms={
    "Admin":1,
    "User":2}

async function createPermission(user,add_perm){
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

    UserPermission.bulkCreate(
    create,
    )
    .then((comment) => {
    console.log(JSON.stringify(comment, null, 2))
    })
}
module.exports = {
    create: createPermission
}