let express = require("express")
const router = express.Router();

const user_search = require("../modules/user_search");
const User = require("../modules/user")
router.post("",async (req,res)=>{
    //createUser
    let response=await new User.LocalUser(req.body).logUp()
    return res.send(response)
})

router.get("",async(req,res)=>{
    //log in
    let {id,password} = req.body;
    let response = await new User.LocalUser(req.body).logIn()
    res.send(response)
})


router.get("/ids",async (req,res)=>{
    //UserQuery
    let {type,id}=req.body
    let log_in_user =await jwt.verify(req.headers.authorization)
    let body={"id":id,"log_in_user":log_in_user.id}
    if (log_in_user.response){
        return res.send(log_in_user)
    }
    let response=await user_search.search(type,body)
    return res.send(response)
})

router.patch("/",async (req,res)=>{
    req.body.id=req.log_in_user.id
    let response=await Promise.all([
        new User.User(req.body).patch(),
        new User.UserInfo(req.body).patch()
    ])

    return res.send(response)    


})


router.delete("/",async(req,res)=>{
    let response = await new User.User(req.log_in_user.id).disactive()
    return res.send(response)
})


module.exports = router