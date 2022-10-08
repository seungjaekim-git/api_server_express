// jwt sign & verify (서명, 검증)

const jwt = require('jsonwebtoken');
const secret = require('./secretkey.js');

// sign  payload 부분 맞는지 틀렸다면 verify도 수정
module.exports ={

    sign : function(user){ //access token 발급

        const payload = { //token에 담을 것
            ID : user.user_id
        };
        const result = {
            //token에 담을 것
            token : jwt.sign(payload, secret.secretkey, secret.option)
        };
        console.log(result);
        return result.token;

    },

    verify : async function(token){ //검증
        // 인증 / 인가
        // 인증 jwt secret key으로 검사 => 인증
        // 인가 db에다가 jwt payload 정보로 요청해서 해당 유저가 누구인지 밝히는 거죠 
        // 인가 정보를 request에다가 추가해줌 

        let decoded;

        try{
            decoded = jwt.verify(token, secret.secretkey); // jwt 풀기
            return{
                ok : true,
                ID : user.user_id                
            };
        } catch(err){
            return {
                ok : false,
                message : err.message
            };
        }
    }
};