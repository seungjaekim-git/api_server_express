const UserModel = require('../models/user.model');
const ExceptionClass = require('../utils/ExceptionClass');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { application, request, response } = require('express');
const { db } = require('../config/db.config');
dotenv.config();
var jwt = require('../middlewares/jwt');


module.exports = {

    //회원가입
    signup : async function(request, response, next){
    
        const user = await UserModel.findID(request.body.ID);
        
        console.log('signup user확인');
        console.log(user);

        // 유저id 존재하면 회원가입 불가
        if (user){

            return new Error('User ID exist, signup fail');
        }else{

            // id 존재 x -> 회원가입 - db create
            const result = await UserModel.create(request.body.ID,request.body.PW,request.body.NAME);
            
            //회원가입 - status 보내기
            return response.status(200).json({'MSG':'Signup success'});
        } 
    },

    
    //로그인
    login : async function(request,response,next){

        //const {ID, PW} = request.body; 
        //입력 받은 정보
        const userID = request.body.ID;
        const userPW = request.body.PW;
    
        console.log('login user ID/PW');
        console.log(userID);
        console.log(userPW);
        
        // db 유저 id와 입력 받은 유저 id 확인 
        const finduserID = await UserModel.findID(userID);

        console.log('db userID 확인');
        console.log(finduserID);
        
        console.log('db user[0]');
        console.log(finduserID[0]);

        // user = []
        // user = [{id : 1, user_id : aaa, user_password : q123 , user_name : IRON}, {id:2, user_id : }]

        // db 유저 pw와 입력 받은 유저 pw 확인
        const finduserPW = await UserModel.findID(userPW);
        console.log('db userPW 확인');
        console.log(finduserPW);

        // id 존재x -> 에러 아니면 통과 
        if (finduserID.length === 0){

            return new Error('UserID dose not exist');
        
        // pw 존재x -> 에러 아니면 통과
        }else if (finduserPW.length === 0){

            return new Error('UserPW dose not exist')
        
        // id / pw 존재 -> 로그인 
        }else{

            //토큰
            const accesstoken = jwt.sign(finduserID);
            console.log(accesstoken);

            //200 token psuh
            return response.status(200).send({'TOKEN':accesstoken});
        }
    }

}



//로그인 확인(jwt 토큰 유효성 검사)
