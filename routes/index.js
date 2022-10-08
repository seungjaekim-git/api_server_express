var express = require('express');
var router = express.Router();
const PictureController = require('../controllers/picture.controller');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/gallery', function(req,res,next){
    res.render('gallery');
});

module.exports = router;
