const Sequence = require('sequire');
const DB = require('../Database/DB');

module.exports = DB.sequelize.define(
    'parents',
    {
        par_id: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true,
        },
        par_fname: {
            type: Sequelize.STRING,
            autoIncrement: true,
        },
        par_lname: {
            type: Sequelize.STRING,
            autoIncrement: true,
        },
        fam_sta_id: {
            type: Sequelize.STRING,
        },
        par_tel: {
            type: Sequelize.STRING,
        },
        par_email: {
            type: Sequelize.STRING,
        },
        par_pass: {
            type: Sequelize.STRING,
        },
        stu_id: {
            type: Sequelize.STRING,
            unique: true,
        },
    });