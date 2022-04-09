const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'leave',
    {
        leave_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        leave_name:{
            type: Sequelize.STRING,
        },
        
    }, {
        tableName: 'leave',
        timestamps:false
    }
    );