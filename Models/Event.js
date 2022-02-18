const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'event',
    {
        event_id:{
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        event_name:{
            type: Sequelize.STRING,
        },
        event_car:{
            type: Sequelize.INTEGER,
        },
    },
    {
        tableName: 'event',
        timestamps:false
    }
    );