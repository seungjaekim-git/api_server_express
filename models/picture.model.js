const DBConnection = require('../config/db.config.js');
const { multipleColumnSet } = require('../utils/common.utils');

class PictureModel {
    tableName = 'pictures'

    uploadFiles = async (values) => {

        const sql = `INSERT INTO ${this.tableName} (file_url,file_saved, file_original_name) VALUES ?`;

        console.log(sql);
        console.log(values);

        const result = await DBConnection.query(sql,[values]);

        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;

    };
}

module.exports = new PictureModel();