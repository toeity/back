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
        stdId:{
            type: Sequelize.STRING,
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
        user_id:{
            type: Sequelize.INTEGER,
        },
    }, {
        tableName: 'student',
        timestamps:false
    }
    );