const DBConnection = require('../config/db.config.js');
const { multipleColumnSet } = require('../utils/common.utils');

var tableName = 'users'

module.exports = {

    //db user_id query
    findID : async function(id) {

        const sql = `SELECT * FROM users WHERE user_id = '${id}'`;

        // sql = select * from user where id = 123

        const result = await DBConnection.query(sql);
        console.log('fidnID result');
        console.log(result);
        return result[0];
    },

    //db user_password query
    findPW : async function(pw) {

        const sql = `SELECT * FROM users WHERE user_password = '${pw}'`;

        // sql = select * from user where id = 123

        const result = await DBConnection.query(sql);
        console.log('fidnPW result');
        console.log(result);
        return result[0];
    },

    create : async (id,password,name) => {
        
        const sql = `INSERT INTO
                     users
                     (user_id, user_password, user_name)
                     VALUES (?,?,?)`;

        // sql = select * from user where id = 123

        const result = await DBConnection.query(sql,[id,password,name]);
        console.log(result);
        return result[0];
    }

}
