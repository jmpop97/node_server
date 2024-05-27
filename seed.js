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
        }    
    await new User.LocalUser(admin).logUp()

    let adds=await seed_db.seed_data('ErrorMessages')
    await models.ErrorMessage.bulkCreate(adds,{updateOnDuplicate: ["id"]})
    console.log("end")
    

}
seed()