const {Status,User} = require('./models')
const result = Status.findAll({
    include:{
        model:User,
        attributes:['id','state']}
})
.then((comment) => {
console.log(JSON.stringify(comment, null, 2))
})