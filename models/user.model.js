const query = require('../config/db.config.js');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../enum/user.roles');

class UserModel {
    tableName = 'user';

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }
}

module.exports = new UserModel;