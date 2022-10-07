const DBConnection = require('../config/db.config.js');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../enum/user.roles');

var tableName = 'users'

module.exports = {

    findOne : async (id) => {

        /*
            params = {
                ID : id
                PW : pass
            }
         */
        const sql = `SELECT *
                     FROM users
                     WHERE ID = ${id}`;

        // sql = select * from user where id = 123

        const result = await DBConnection.query(sql,[]);

        return result[0];
    },

    signup : async (params) => {

    }

}
