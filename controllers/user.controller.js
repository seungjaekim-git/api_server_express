const UserModel = require('../models/user.model');
const ExceptionClass = require('../utils/ExceptionClass');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {

    userLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { email: email, password: pass } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ExceptionClass(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new ExceptionClass(401, 'Incorrect password!');
        }

        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new ExceptionClass(400, 'Validation faild', errors);
        }
    }


}

module.exports = new UserController;
