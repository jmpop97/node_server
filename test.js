// const seed_db = require("./modules/seedDB")
// const {ErrorMessage}=require("./models")
// async function test(){
//     let adds=await seed_db.seed_data('ErrorMessages')
//     console.log(adds)
//     ErrorMessage.bulkCreate(adds)
// }
// test()


const {UserIPLog}  = require("./models")
UserIPLog.create({userId:"id1",IP:"123"})