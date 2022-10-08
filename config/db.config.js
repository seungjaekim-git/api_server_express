// .env 파일에 있는 것들 가져옴
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path: path.join(__dirname, '../.env') });

// mysql connection 용 라이브러리
const mysql2 = require('mysql2');

// DB 접속용 클래스
class DBConnection {

    // 생성자
    constructor() {
        this.db = mysql2.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'password',
            database: process.env.DB_DATABASE || 'express_prac'
        });
        this.checkConnection();
    }

    // 연결 확인용
    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                console.log('DB Connected')
                connection.release();
            }
            return
        });
    }

    // 비동기 함수로 쿼리 요청
    // sql과 값들을 넣어주어야 된다
    // 각 조건들은 해당 controller 에서 정의
    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            this.db.query(sql, values, callback);

            // 에러 발생시 커스템 에러 발생
        }).catch(err => {
            // const mysqlErrorList = Object.keys(HttpStatusCodes);
            // // convert mysql errors which in the mysqlErrorList list to http status code
            // err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
            console.log(err);
            throw err;
        });
    }
}

module.exports = new DBConnection()