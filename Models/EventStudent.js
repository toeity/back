const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'event_student',
    {
        stu_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        event_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        timestamp:{
            type: Sequelize.DATEONLY,
            defaultvalue:Sequelize.NOW,
        },
        
    }, {
        tableName: 'event_student',
        timestamps:false
    }
    );