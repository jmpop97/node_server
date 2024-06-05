let express = require("express")
const router = express.Router();
const api = require('../modules/api_request')
const User =require('../modules/user')
const error_message=require('../cache_DB/error_message')

const kakaoOpt = {
    clientId: process.env.kakao_client_id,
    redirectUri: process.env.kakao_redirect_uri,
  };
const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}&response_type=code`;

const googleOpt ={
  clientId: process.env.google_client_id,
  redirectUri: process.env.google_redirect_uri,

}

const googleAuthorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleOpt.clientId}&redirect_uri=${googleOpt.redirectUri}&response_type=code&scope=profile email`

router.get("/local",async(req,res)=>{
  let {email}=req.query
  type="createUser"
  if (email){
    response=await new User.Authenfication({email,type}).AuthenficationCreate()
    return res.send(response)
  }
  return res.send(await error_message.get(32))
})

router.get("/local/verify",async(req,res)=>{
  let {email,key}=req.query
  type="createUser"
  if (email){
    left_count=await new User.Authenfication({email,type,key}).verify()
    if (left_count<0){
      response=await error_message.get(0)
      }
    else{
      response={response:400,left_count}
    }    
    return res.send(response)
  }
  return res.send(await error_message.get(32))
})

router.get("/kakao", (req, res) => {
    res.redirect(kakaoLoginURL);
  });


router.get("/kakao/code",async (req, res) => {
  let user= await api.kakao_login(req.query?.code)
  if(!user["kakao_account"]?.email){
    return res.send({response:400})
    }
  body={
    type:"Kakao",
    email:user["kakao_account"]?.email,
    authNames:["User"]
  }
  let response = await new User.SocialUser(body).logIn()
  res.send(response)
});


router.get("/google", (req, res) => {
  res.redirect(googleAuthorizationUrl);
});


router.get("/google/code",async (req, res) => {
  let user= await api.google_login(req.query?.code)
  if(!user.email){
    return res.send({response:400})
    }
  body={
    type:"google",
    email:user.email,
    authNames:["User"]
  }
  let response = await new User.SocialUser(body).logIn()
  res.send(response)
});

module.exports = router