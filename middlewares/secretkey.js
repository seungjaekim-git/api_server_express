//시크릿키

module.exports = {
    secretkey : 'YoUrSeCrEtKeY123', // 원하는 시크릿키

    option : {
        algorithm : "HS256", // 해싱 알고리즘
        expiresIn : "30m",  // 토큰 유효 기간 -시간은 얼마나 설정해야하는지
        issuer : "issuer" // 발행자
    }
}