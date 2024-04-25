const randToken = require('rand-token');
const jwt = require('jsonwebtoken');


module.exports = {
    sign: async (user) => {
        /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
        const payload = {
            id: user.id,
            email: user.email
        };
        const result = {
            token: jwt.sign(payload,process.env.PASSWORD_SECRET_STRING,{expiresIn:process.env.JWT_REFRESH_EXPIRATION}),
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    verify: (auth) => {
        let [token,_]=["",""]
        if (auth){
             [_,token]=auth.split("Bearer ")
        }
        if (!token){
            return {
                "response": 400,
                "error":"wrong token"
            }
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.PASSWORD_SECRET_STRING);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('expired token');
                return {
                    "response":419,
                    "message":"토큰이 만료되었습니다"
                }

            } else if (err.name === 'JsonWebTokenError') {
                console.log('invalid token');
                return {
                    "response":401,
                    "message":"유효햐지 않은 토큰입니다"
                }
            } else{
                console.log("token hidden error")
                console.log(err.name)
                return {
                    "response":400
                }
            }
        }
        return decoded;
    }
}
