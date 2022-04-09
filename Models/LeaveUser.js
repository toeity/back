const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'leave_user',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id:{
            type: Sequelize.INTEGER,
        },
        leave_id:{
            type: Sequelize.INTEGER,
        },
        timestamp:{
            type: Sequelize.STRING,
        },
        leave_type:{
            type: Sequelize.INTEGER,
        }
        
    }, {
        tableName: 'leave_user',
        timestamps:false
    }
    );