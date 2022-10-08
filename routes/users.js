const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

//회원가입 router
router.post('/signup',async function(req, res, next) {
  return await userController.signup(req,res,next);
});

//로그인 router
router.post('/login',async (req,res,next) => {
  return await userController.login(req,res,next);
})





module.exports = router;
