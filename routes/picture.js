const express = require('express');
const router = express.Router();
const uploadFile = require('../middleware/upload.file.middleware')
const pictureController = require('../controllers/picture.controller');


// 사진 업로드 API
router.post('/', uploadFile.any(), async (req,res,next) => {
    console.log(req);
    return await pictureController.uploadFiles(req,res,next);
})

// 유저 확인 필요
// 사진 리스트 확인 API
router.get('/', async (req, res, next) => {
    // 사진 읽는거
    return await pictureController.getListFiles(req,res,next);
})

// 사진 한장 확인 API
// 유저 확인 필요
router.get('/:pic_id', async (req, res, next) => {
    return await pictureController.getOneFile(req,res,next);
})


// 사진 삭제 API
// 해당 유저가 그 사진 소유권 확인 필요
router.delete('/:pic_id', async (req, res, next) => {
    // 사진 삭제하는 로직
    return await pictureController.deleteOneFile(req,res,next);

})


module.exports = router;
