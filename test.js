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
async function test(){
    let adds=await seed_db.seed_data('ErrorMessages',false,18)
    console.log(adds)
    await model.ErrorMessage.bulkCreate(adds)
    // await PermissionAPI.bulkCreate(adds)
}


// const cache_api = require("./cache_DB/permissionAPI")
// const check = require("./modules/permission")
// async function test(){
//     result=await check.apiPermissionCheck("GET/user",["test"])
//     console.log(result)
// }




test()