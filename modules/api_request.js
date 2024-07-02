async function request_form(params){
  let{url,method,headers,body}=params
    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    response=await fetch(url,{
        method:method,
        headers:headers,
        body: formBody
      })
    jsonData = await response.json();
    return jsonData
}


async function kakao_login(code){
  url = 'https://kauth.kakao.com/oauth/token'
  method = 'POST'
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  body = {
        'grant_type': 'authorization_code',
        'client_id': process.env.kakao_client_id,
        'redirect_uri': process.env.SERVER_ADDRESS+process.env.kakao_redirect_uri,
        'code':code,
        // 'scope':'openid account_email'
    };
    token = await request_form({url,method,headers,body})

    url = 'https://kapi.kakao.com/v2/user/me'
    method = 'POST',
    headers={
      Authorization : "Bearer " +token.access_token
    }
    return request_form({url,method,headers})
}

async function google_login(code){
  url='https://oauth2.googleapis.com/token'
  method='POST'
  headers={
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  body={
    grant_type: 'authorization_code',
    client_id:process.env.google_client_id,
    client_secret:process.env.google_clientSecret,
    redirect_uri:process.env.SERVER_ADDRESS+process.env.google_redirect_uri,
    code:code,
    }

  token = await request_form({url,method,headers,body})

  url=`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token.access_token}`
  method='POST'
 return await request_form({url,method})
  
}

async function ip_location(ip){
  x= await fetch(`https://nordvpn.com/wp-admin/admin-ajax.php?action=get_user_info_data&ip=${ip}`)
  return x.json()
}
ip_location()
module.exports={
  kakao_login,
  google_login,
  ip_location
}