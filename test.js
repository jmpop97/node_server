require('dotenv').config();
const user = require("./modules/user")
const seed_db=require("./modules/seedDB")
const models=require("./models")

async function test(){
    let adds=await seed_db.seed_data('Permissions')
    console.log(adds[2].authName)
}

test()