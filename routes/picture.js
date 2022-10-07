const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// 사진 업로드 API
router.post('/',async (req,res,next) => {
    return await userController.userLogin(req,res,next)
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
