const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'student',
    {
        stu_id:{
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        stu_fname:{
            type: Sequelize.STRING,
        },
        stu_lname:{
            type: Sequelize.STRING,
        },
        stu_address:{
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'student',
        timestamps:false
    }
    );