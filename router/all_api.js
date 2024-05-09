let express = require("express")
const router = express.Router();
const {UserIPLog} = require("../models")
const jwt = require("../modules/jwt")


router.use("", async (req, res, next)=>{
    let log_in_user = await jwt.verify(req.headers.authorization)
    add={IP:req.ip,
        userId:log_in_user.id,
        url:req.method+req.url}
    console.log(add)
    UserIPLog.create(add)
    next();
  });

module.exports = router