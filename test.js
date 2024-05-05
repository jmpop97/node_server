const {Permission} = require("./models")
Permission.findAll({})
.then((comment) => {
console.log(comment[0].authId)
})
// Permission.findAll({where:{authId:1}}).then((comment) => {
//     console.log(comment)
//     })



// const {Status,User} = require('./models')
// const result = Status.findAll({
//     include:{
//         model:User,
//         attributes:['id','state']}
// })
// .then((comment) => {
// console.log(JSON.stringify(comment, null, 2))
// })