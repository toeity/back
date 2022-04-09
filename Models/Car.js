const Sequelize = require('sequelize');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'car',
    {
        
        car_reg: {
            type: Sequelize.STRING,
        },
        car_no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        car_seat: {
            type: Sequelize.INTEGER, 
        },
    },{
        tableName: 'car',
        timestamps:false
    }
    );