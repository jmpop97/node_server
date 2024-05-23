require('dotenv').config();
const user = require("./modules/user")
const seed_db=require("./modules/seedDB")
const {PermissionAPI,API}=require("./models")

async function test(){
    x= await new user.LocalUser("test","2","t@n.com").logUp()
}


test()