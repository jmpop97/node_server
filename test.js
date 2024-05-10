// const seed_db = require("./modules/seedDB")
// const {ErrorMessage}=require("./models")
// async function test(){
//     let adds=await seed_db.seed_data('ErrorMessages')
//     console.log(adds)
//     ErrorMessage.bulkCreate(adds)
// }
// test()


const {API,PermissionAPI,ErrorMessage,Permission}  = require("./models")

// const ErrorMessage = require("./cache_DB/error_message")


async function test(){
    // await API.create({apiId:"test"})
    // await PermissionAPI.create({apiId:"test",authName:"User"})
    // await PermissionAPI.create({apiId:"test",authName:"Admin"})

    let adds=await API.findOne(
        {include:
            {
                model:Permission,
                through:{
                    attributes:[]
                }
            }
        }
    )
    adds.Permissions.map(item=>item.authName)
    console.log(adds.Permissions)
}
test()