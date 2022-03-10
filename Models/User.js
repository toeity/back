const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'user',
    {
        user_id:{
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        user_email:{
            type: Sequelize.STRING,
        },
        user_pass:{
            type: Sequelize.STRING,
        },
        auth_id:{
            type: Sequelize.INTEGER,
        },
        user_fname:{
            type: Sequelize.STRING,
        },
        user_lname:{
            type: Sequelize.STRING,
        },
        user_tel:{
            type: Sequelize.INTEGER,
        },
        car_no:{
            type: Sequelize.INTEGER,
        },
    }
    , {
        tableName: 'user',
        timestamps:false
    }
    );