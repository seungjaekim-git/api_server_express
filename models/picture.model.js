const DBConnection = require('../config/db.config.js');
const { multipleColumnSet } = require('../utils/common.utils');

class PictureModel {
    tableName = 'pictures'

    // 사진 업로드 정보 입력 쿼리
    insertList = async (values) => {

        const sql = `INSERT INTO ${this.tableName} (file_url,file_saved, file_original_name) VALUES ?`;

        console.log(sql);
        console.log(values);

        const result = await DBConnection.query(sql,[values]);

        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;

    };

    // 사진 리스트 정보 조회 쿼리
    findList = async (user_id) => {

        const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ${user_id}`;

        const result = await DBConnection.query(sql);

        return result;
    }

    // 사진 한장 정보 조회 쿼리
    findOne = async (pic_id) => {

        const sql = `SELECT * FROM ${this.tableName} WHERE pic_id = ${pic_id} LIMIT 1`;

        const result = await DBConnection.query(sql);

        return result;

    }

    // 사진 한장 삭제 쿼리
    deleteOne = async (pic_id) => {

        const sql = `DELETE FROM ${this.tableName} WHERE pic_id = ${pic_id}`

        const result = await DBConnection.query(sql);

        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;

    }

}

module.exports = new PictureModel();