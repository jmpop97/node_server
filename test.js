const models = require("./models/index")
models.sequelize.sync().then(()=>{
    console.log("연동")
}).catch(err=>{
    console.log("err");
console.log(err)
})