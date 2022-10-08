// multer 모듈의 설정값 세팅 (파일 저장 위치 )
const util = require("util");
const multer = require("multer");
const path = require('path');

// 파일의 최대 크기 설정 가능하지만 지금은 필요없음
// 디도스 공격에 대비하기 위해서는 실제 서비스에서는 적용필요
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    // cb 뜻은 콜백
    // 해당 값이 False라면 저장을 취소함
    destination: (req, file, cb) => {
        console.log(process.cwd());
        cb(null, process.cwd() + "/public/images/");
    },
    filename: (req, file, cb) => {
        // 이정도까지 복잡하게 갈 필요없을듯
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //console.log(uniqueSuffix);
        cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
});

// 파일은 꼭 jpeg나 jpg만 가능
const fileFilter = (req, file, cb) => {

    // mime type 체크하여 이미지만 필터링
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


let uploadFile = multer({
    storage: storage,
    //limits: { fileSize: maxSize },
    fileFilter: fileFilter
});

module.exports = uploadFile;