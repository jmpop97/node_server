let express = require("express")
const router = express.Router();
const cache_error_message = require("../cache_DB/error_message")
const {ErrorMessage} = require("../models")


router.get("",async(req,res)=>{
    //search
    let {at}=req.body
    x = await cache_error_message.search(at)
    res.send(x)
})
router.patch("",async(req,res)=>{
    //search
    let {id,at,response,detail,intro}=req.body
    x = await ErrorMessage.update(
        {
            at,response,detail,intro
        },
        {where:{errorMessagePk:id}}
    )
    res.send(x)
})


router.post("/DB",async(req,res)=>{
    x = await cache_error_message.setAll()
    res.send(x)
})


router.patch("/DB",async(req,res)=>{
    let {id}=req.body
    let x
    if (id){
    x = await cache_error_message.patch(id)
    }
    res.send(x)
})

module.exports = router