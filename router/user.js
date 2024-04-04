let express = require("express")
const router = express.Router();

router.get("/",(req,res)=>{
    res.send({"test":"test"})
})

router.get("/check/checker",(req,res)=>{
    res.send({"check":"check"})
    res.send(에러)
})

module.exports = router