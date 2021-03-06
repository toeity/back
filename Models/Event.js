const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'event',
    {
        event_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        event_name:{
            type: Sequelize.STRING,
        },
    },
    {
        tableName: 'event',
        timestamps:false
    }
    );



    