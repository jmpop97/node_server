let express = require("express")
const router = express.Router();
const api = require('../modules/api_request')


const kakaoOpt = {
    clientId: process.env.client_id,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirect_uri,
  };


router.get("/kakao", (req, res) => {
    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}&response_type=code`;
    res.redirect(kakaoLoginURL);
  });


router.get("/kakao/code",async (req, res) => {
  x= await api.kakao_login(req.query?.code)
  console.log(x)
});

module.exports = router