const {Status,User,Permission,} = require('./models')
// const result = Status.findAll({attributes:["stateName"],
//     include:{
//         model:User,
//     }
// })
// .then((comment) => {
// console.log(JSON.stringify(comment, null, 2))
// })

const result1 = User.findAll({attributes:["id"],
    include:{
        model:Permission,
        through: {
            attributes: [],
          },
    },
})
.then((comment) => {
console.log(JSON.stringify(comment, null, 2))
})