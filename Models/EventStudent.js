const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'event_student',
    {
        eid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        stu_id:{
            type: Sequelize.INTEGER,
        },
        event_id:{
            type: Sequelize.INTEGER,
        },
        event_time:{
            type: Sequelize.STRING, 
        },
        event_type:{
            type: Sequelize.INTEGER,
        }
        
    }, {
        tableName: 'event_student',
        timestamps:false
    }
    );

    
   