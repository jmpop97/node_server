let express = require("express")
const router = express.Router();
const {UserIPLog} = require("../models")

router.use("", (req, res, next)=>{
    UserIPLog.create({IP:req.ip,url:req.method+req.url})
    next();
  });

module.exports = router