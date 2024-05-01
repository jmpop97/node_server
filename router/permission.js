let express = require("express")
const router = express.Router();


const jwt = require("../modules/jwt")


router.post("",async(req,res)=>{
    let log_in_user = await jwt.verify(req.headers.authorization)
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    if (log_in_user.auth.includes("Admin")){
        
    }
    else{
        return res.send({response:401.1})
    }
    return res.send({response:200})
})

module.exports = router