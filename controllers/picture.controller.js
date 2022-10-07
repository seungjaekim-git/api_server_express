const PictureModel = require('../models/picture.model');
const ExceptionClass = require('../utils/ExceptionClass');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 트랜잭션 처리도 고민해봐야됨
// 전송도중 인터넷이 끊기는 경우도 있으니께
// 서버가 꺼지면 ? 이건 사업부가 결정하는것
class PictureController {

    uploadFiles = async (req, res, next) => {

        console.log(req.files)
        const file_saved = new Date().toJSON().slice(0, 19).replace('T', ' ')

        const values = req.files.map( item => [item.path, file_saved,item.originalname]);
        const result = await PictureModel.uploadFiles(values);
        console.log(result);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        return res.status(200).send({
            'token': token
        });


    };
}

module.exports = new PictureController();