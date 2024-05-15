


const seed_db=require("./modules/seedDB")
const model=require("./models")
//




// const cache_api = require("./cache_DB/permissionAPI")
// const check = require("./modules/permission")


async function test(){
    let adds=await seed_db.seed_data('API')
    console.log(JSON.stringify(adds, null, 2))
    // await PermissionAPI.bulkCreate(adds)
}




test()