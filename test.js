// const seed_db = require("./modules/seedDB")
// const {ErrorMessage}=require("./models")
// async function test(){
//     let adds=await seed_db.seed_data('ErrorMessages')
//     console.log(adds)
//     ErrorMessage.bulkCreate(adds)
// }
// test()


const seed_db=require("./modules/seedDB")
const model=require("./models")
//

//seed
// async function test(){
    //API unique error
    // let adds=await seed_db.seed_data('ErrorMessages',false,21)
    // console.log(adds)
    // await model.API.bulkCreate(adds)
    // await model.ErrorMessage.bulkCreate(adds)
// }


// const cache_api = require("./cache_DB/permissionAPI")
// const check = require("./modules/permission")
const {Op} = require("sequelize")
async function test(){
    await model.PermissionAPI.destroy(
        {where:{
            apiId:"GET/user/ids",
            authName:{
                [Op.notIn]:['User']
            }
            }},
        )
        .then((comment) => {
            response={response:200}
        })
        .catch((error)=>{
        console.log(error)
    })
}





test()