const PictureModel = require('../models/picture.model');
const ExceptionClass = require('../utils/ExceptionClass');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 트랜잭션 처리도 고민해봐야됨
// 전송도중 인터넷이 끊기는 경우도 있으니께
// 서버가 꺼지면 ? 이건 사업부가 결정하는것
// 모든 리턴값 포멧 수정 필요
class PictureController {

    // 파일 업로드 로직

    uploadFiles = async (req, res, next) => {

        console.log(req.files)
        const file_saved = new Date().toJSON().slice(0, 19).replace('T', ' ')

        // multer library 에서 req.files에 파일 정보를 넣어줌 => 그 파일을 sql에 들어갈수있게 포멧 변경
        const values = req.files.map( item => [item.path, file_saved,item.originalname]);
        const result = await PictureModel.insertList(values);
        console.log(result);

        if (!result) {
            throw new Error('No File is Inputted');
        }

        return res.status(200).json('Upload Completed');

    };

    // 파일 리스트 확인
    getListFiles = async (req, res, next) => {

        console.log(req);

        const user_id = req.user_id || 1;

        //const result = await PictureModel.findList(req.user_id);
        const result = await PictureModel.findList(user_id);

        return res.status(200).send({
            result
        });
    }

    // 파일 한개 확인
    getOneFile = async (req, res, next) => {

        console.log(req);

        const result = await PictureModel.findOne(req.pic_id);

        return res.status(200).send({
            result
        })
    }

    // 파일 삭제 로직
    deleteOneFile = async (req, res, next) => {

        console.log(req);

        // 해당 picture들 중에 삭제 요청한 사진 아이디값이 있는지 체크 필요
        const pictures = await PictureModel.findList(req.user_id);

        const result = await PictureModel.deleteOne(req.pic_id);

        return res.status(200).send('Delete Completed');

    }
}

module.exports = new PictureController();