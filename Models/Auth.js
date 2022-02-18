const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'auth',
    {
        auth_id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        auth_name: {
            type: Sequelize.STRING,
        },
    },{
        tableName: 'auth',
        timestamps:false
    }
    );