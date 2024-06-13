require('dotenv').config();
const seed_db=require("./modules/seedDB")
const models=require("./models")    
const User=require("./modules/user")
async function seed(){
    let status=await seed_db.seed_data('Status')
    await models.Status.bulkCreate(status)
    let permissions=await seed_db.seed_data('Permissions')
    await models.Permission.bulkCreate(permissions)
    let error_messages=await seed_db.seed_data('ErrorMessages')
    await models.ErrorMessage.bulkCreate(error_messages)
    let perms=await seed_db.seed_data('PermissionApi')
    let api=perms.reduce((unique, item) => {
          return unique.includes(item.apiName) ? unique : [...unique, item.apiName]
        }, []);
        api=api.map(x=>{return {apiName:x}})
    await models.API.bulkCreate(api)
    await models.Permission_API.bulkCreate(perms)
      api=api.map(x=>{return {apiName:x}})
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
    console.log("end")
    

}
seed()