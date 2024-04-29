const {Status,User} = require('./models')
const result = Status.findAll({include:User
})
.then((comment) => {
console.log(JSON.stringify(comment, null, 2))
})