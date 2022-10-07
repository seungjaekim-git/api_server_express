const express = require('express');
const router = express.Router();
const uploadFile = require('../middleware/upload.file.middleware')
const pictureController = require('../controllers/picture.controller');

// 사진 업로드 API
router.post('/', uploadFile.any(), async (req,res,next) => {
    console.log(req);
    return await pictureController.uploadFiles(req,res,next);
})

// 사진 리스트 확인 API
router.get('/', async (req, res, next) => {
    // 사진 읽는거
})

// 사진 삭제 API
router.delete('/:picId', async (req, res, next) => {
    // 사진 삭제하는 로직

})


module.exports = router;
