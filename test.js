const {Status,User,Permission,UserPermission,UserInfo} = require('./models')

// User.findAll({
//     attributes:["id","password","state","email"],
//     where: {
//         id:"id1"
//     },
//         include:[{
//             model:Status,
//             attributes:['stateName']
//     },
//     {
//         attributes:['authName'],
//         model:Permission,
//         through: {
//             attributes: [],
//           },
//     }]
// })
// .then((comment) => {
// console.log(JSON.stringify(comment, null, 2))
// })

id="id-5"
email=id+"@m.com"
input={id:id,
password:"0",
email:email,
UserInfo:{userId:id}}
User.create(input,{include:[UserInfo]})
.then((comment) => {
console.log(JSON.stringify(comment, null, 2))
})
// User.findOne({
//     where: {id:'id1'},
//     include:Userinfo
// })
// .then((comment) => {
// console.log(JSON.stringify(comment, null, 2))
// })