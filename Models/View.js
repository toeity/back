const DB = require('../Database/DB');
const Sequelize = require('sequelize');

module.exports = DB.sequelize.define(
    'view',
    {
        view_id:{
            type: Sequelize.INTEGER,
            unique: true,
            autoIncrement: true
,
            primaryKey: true,
        },
        view_type:{
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'view',
        timestamps:false
    }
    );