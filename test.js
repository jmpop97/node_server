const { Association } = require('sequelize')
const {Status,User,Permission,UserPermission,UserInfo} = require('./models')
const test = require('./modules/permission')
user={id:"id1",
auth:["Admin","User"]}
add_perm=["Admin","User"]
// let [create,update]=add_perm.reduce((a,b)=>
//     {
//         console.log(a,b)
//             if(user.auth.includes(b)){
//             a[0].push(b)
//     }
//         else{
//             a[1].push(b)
//         }
//         return a
//     }
//     ,[[],[]])
// console.log(create)
test.create(user,add_perm)