let express = require("express")
const router = express.Router();
const {UserIPLog} = require("../models")
const jwt = require("../modules/jwt")
const permission = require("../modules/permission")
const error_message=require('../cache_DB/error_message')

router.use("", async (req, res, next)=>{
  //log_in
  let log_in_user = await jwt.verify(req.headers.authorization)
  req.log_in_user=log_in_user
  add={IP:req.ip,
      userId:log_in_user.id,
      url:req.method+req.url}
  UserIPLog.create(add)
  //permission
  if (add.url.slice(-1)=='/'){
    console.log("wrok")
    add.url=add.url.slice(0,-1)
  }
  let bool_permission=await permission.apiPermissionCheck(add.url,log_in_user.auth)
  if (bool_permission){
    next();
    }
  else if (bool_permission==false){
    res.send(await error_message.get(19))
  }
  else{
    res.send(await error_message.get(20))
  }
  });



module.exports = router