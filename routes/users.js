const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const Role = require('../enum/user.roles');

router.get('/',function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
  //미들웨어 로직 토큰 로직
  auth()
},async (req,res,next) => {
  return await userController.userLogin(req,res,next)
})



module.exports = router;
