const {Status,User,Permission,} = require('./models')
// const result = Status.findAll({attributes:["stateName"],
//     include:{
//         model:User,
//     }
// })
// .then((comment) => {
// console.log(JSON.stringify(comment, null, 2))
// })

User.findAll({
    attributes:["id","password","state","email"],
    where: {
        id:"id1"
    },
        include:[{
            model:Status,
            attributes:['stateName']
    },
    {
        attributes:['authName'],
        model:Permission,
        through: {
            attributes: [],
          },
    }]

})
.then((comment) => {
console.log(JSON.stringify(comment, null, 2))
})