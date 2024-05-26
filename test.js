require('dotenv').config();
const user = require("./modules/user")
const seed_db=require("./modules/seedDB")
const models=require("./models")

async function test(){
    x=await models.User.findByPk(
        "Localid1",
        {include:[{
            model:models.Status,
            attributes:['stateName']
    },
    {
        attributes:['authName'],
        model:models.Permission,
        through: {
            attributes: [],
          },
    }]
    })
    .then((comment) => {
        console.log(comment)
    })
}


test()