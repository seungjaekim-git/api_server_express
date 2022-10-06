const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const Role = require('../enum/user.roles');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',userController.userLogin)

module.exports = router;
