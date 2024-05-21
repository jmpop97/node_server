const seed_db=require("./modules/seedDB")
const models=require("./models")    

async function seed(){
    let adds=await seed_db.seed_data('ErrorMessages')
    await models.ErrorMessage.bulkCreate(adds,{updateOnDuplicate: ["id"]})
    console.log("end")
}
seed()