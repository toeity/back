const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'noti',
    {
        noti_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        noti_static:{
            type: Sequelize.INTEGER,
        },
        noti_time:{
            type: Sequelize.STRING,
        },
        
    }, {
        tableName: 'noti',
        timestamps:false
    }
    );