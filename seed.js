require('dotenv').config();
const seed_db=require("./modules/seedDB")
const models=require("./models")    
const User=require("./modules/user")
async function seed(){
    admin={
        id:"admin",
        password:"admin",
        email:"admin@naver.com",
        authNames:["Admin"],
        type:"createUser",
        key:"key"
        }
    await models.Authenfication.create(admin)
    await new User.LocalUser(admin).logUp(true)

    let adds=await seed_db.seed_data('ErrorMessages')
    await models.ErrorMessage.bulkCreate(adds)
    console.log("end")
    

}
seed()