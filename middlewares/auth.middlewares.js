const UserModel = require('../models/user.model');
const jwt = require('../middlewares/jwt')

// jwt 토큰을 파싱해서 req에 추가하는 미들웨어
class AuthMiddleware {

    checkUser = async (req, res, next) => {

        const token = req.headers.authorization

        const decdoed = jwt.verify(token).ID;

        const user = UserModel.findID(decoded);

        req.user_id = user_id;

        return next();
    }
}

module.exports = new AuthMiddleware();