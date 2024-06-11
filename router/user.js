let express = require("express")
const router = express.Router();

const user_search = require("../modules/user_search");
const User = require("../modules/user")
router.post("",async (req,res)=>{
    //createUser
    if ( !req.log_in_user.auth?.includes("Admin") ||req.body.authNames){
        req.body.authNames=["User"]
    }
    let response=await new User.LocalUser(req.body).logUp()
    return res.send(response)
})

router.get("",async(req,res)=>{
    //log in
    let response = await new User.LocalUser(req.body).logIn()
    res.send(response)
})


router.get("/ids",async (req,res)=>{
    let response=await user_search.search(req.body)
    return res.send(response)
})

router.patch("/",async (req,res)=>{
    req.body.id=req.log_in_user.userId
    let response=await Promise.all([
        new User.User(req.body).patch(),
        new User.UserInfo(req.body).patch()
    ])
    return res.send(response)    
})


router.delete("/",async(req,res)=>{
    let response = await new User.User({}).deactivate(req.log_in_user.userId)
    return res.send(response)
})


module.exports = router