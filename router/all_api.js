let express = require("express")
const router = express.Router();
const {UserIPLog} = require("../models")
const permission = require("../modules/permission")
const error_message=require('../cache_DB/error_message')
const user=require('../modules/user')
const email=require('../modules/send_email')

router.use("", async (req, res, next)=>{
  //log_in
  req.log_in_user = await new user.JWT().verify(req.headers.authorization,req.ip)
  // DB터질려고 한다./ 조정이 필요함
  add={
      api:req.method+req.url
    }
  // UserIPLog.create(add)

    
  //permission
  if (add.api?.slice(-1)=='/'){
    add.api=add.api.slice(0,-1)
  }
  let bool_permission=await permission.PermissionAPICheck(add.api,req.log_in_user.auth)
  if (bool_permission){
    next();
    }
  else if (bool_permission==false){
    if (req.log_in_user.response){
      return res.send(req.log_in_user)
    }
    else{
      res.send(await error_message.get(19))
    }
  }
  else{
    res.send(await error_message.get(20,add.api))
    next();
  }
  });



module.exports = router