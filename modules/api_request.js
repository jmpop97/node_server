async function x_www_form(method,body,url){
    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    response=await fetch(url,{
        method:method,
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
    jsonData = await response.json();
    return jsonData
}

async function combine_auth(method,body,token,url){
    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    response=await fetch(url,{
        method:method,
        headers:{
            Authorization : "Bearer " +token
        },
        body: formBody
      })
    jsonData = await response.json();
    return jsonData
}

async function kakao_login(code){
    var details = {
        'grant_type': 'authorization_code',
        'client_id': process.env.client_id,
        'redirect_uri': process.env.redirect_uri,
        'code':code,
        // 'scope':'openid account_email'
    };
    token = await x_www_form('POST',details,'https://kauth.kakao.com/oauth/token')
    return combine_auth('POST',{},token.access_token,'https://kapi.kakao.com/v2/user/me')
}

module.exports={kakao_login}