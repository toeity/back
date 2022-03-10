const Car = require("../Models/Car");
const User = require("../Models/User");
const Auth = require("../Models/Auth");
const {Op} = require("sequelize")

exports.LoginPage = function (req, res) {
    return res.render('Login');
}

exports.RegisterPage = function (req, res) {
    return res.render("Register")
}

exports.HomePage = function (req, res) {
    return res.render("Home")
}

exports.CardataPage = function (req, res) {
    Car.hasMany(User, { foreignKey: 'car_no' })
    Car.findAll({ include: { model: User, require: true } }).then(function (result) {
        let data = result.map(item => (
            {
                car_reg: item.car_reg,
                car_no: item.car_no,
                car_seat: item.car_seat,
                driver: item.users?.find(user => user.auth_id === 3),
                teacher: item.users?.find(user => user.auth_id === 2)
            }
        ))
        console.log(data);
        return res.render("Cardata", { result: JSON.stringify(data) })
    })
    // return res.render("Cardata")
}

exports.RequestuserPage = function (req, res) {
    User.findAll({ raw: true }).then(function (result) {
        
        return res.render("Requestuser", { result: JSON.stringify(result) })
    })
    // return res.render("Authuser")
}


exports.ViewrequestuserPage = function (req, res) {
    User.findAll({ raw: true }).then(function (result) {
        return res.render("Viewrequestuser", { result: JSON.stringify(result) })
    })
    // return res.render("Authuser")
}

exports.AuthuserPage = function (req, res) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' })
    User.findAll({ raw: true, include: Auth,where:{
        auth_id: {
            [Op.not]:6
        }
    } }).then(function (result) {
        return res.render("Authuser", { result: JSON.stringify(result) })
    })
    // return res.render("Authuser")
}
exports.AdduserPage = function (req, res) {
    User.findAll({ raw: true }).then(function (result) {
        return res.render("Adduser", { result: JSON.stringify(result) })
    })
    // return res.render("Authuser")
}

exports.EdituserPage = function (req, res) {
    User.findOne({ raw: true, where: { user_id: req.params.user_id } }).then(function (result) {
        return res.render("Edituser", { result: result })
    })
    // return res.render("Authuser")
}

exports.ViewuserPage = function (req, res) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' })
    User.findOne({ raw: true, where: { user_id: req.params.user_id } }).then(function (result) {
        return res.render("Viewuser", { result: result })
    })
    // return res.render("Authuser")
}

exports.AddcarPage = function (req, res) {
    Car.findAll({ raw: true }).then(function (result) {
        return res.render("Addcar", { result: JSON.stringify(result) })
    })
    // return res.render("Authuser")
}
// exports.EditcarPage = function (req, res) {
//     Car.findOne({ raw: true, where: { car_no: req.params.car_no } }).then(function (result) {
//         return res.render("Editcar", { result: result })
//     })
//     // return res.render("Authuser")
// }
exports.EditcarPage = function (req, res) {
    Car.hasMany(User, { foreignKey: 'car_no' })
    User.findAll().then((users) => {
        Car.findOne({ raw: true, where: { car_no: req.params.car_no } }).then(function (result) {
            if (!!result) {
                // let data = result.map(item => (
                //     {
                //         car_reg: item.car_reg,
                //         car_no: item.car_no,
                //         car_seat: item.car_seat,
                //         driver: item.users?.find(user => user.auth_id === 3),
                //         teacher: item.users?.find(user => user.auth_id === 2)
                //     }
                // ))
                let dataDriver = users?.find((item)=> item.auth_id === 3);
                let dataTeacher = users?.find((item)=> item.auth_id === 2);
                let data = {
                    car_reg: result.car_reg,
                    car_no: result.car_no,
                    car_seat: result.car_seat,
                    driver: `${dataDriver.dataValues.user_fname} ${dataDriver.dataValues.user_lname}`,
                    teacher: `${dataTeacher.dataValues.user_fname} ${dataTeacher.dataValues.user_lname}`,
                }
                
                console.log(data);
                return res.render("Editcar", { result: data })
            } else {

            }
        })
    })
}
exports.ViewcarPage = function (req, res) {
    Car.hasMany(User, { foreignKey: 'car_no' })
    User.findAll().then((users) => {
        Car.findOne({ raw: true, where: { car_no: req.params.car_no } }).then(function (result) {
            if (!!result) {
                // let data = result.map(item => (
                //     {
                //         car_reg: item.car_reg,
                //         car_no: item.car_no,
                //         car_seat: item.car_seat,
                //         driver: item.users?.find(user => user.auth_id === 3),
                //         teacher: item.users?.find(user => user.auth_id === 2)
                //     }
                // ))
                let dataDriver = users?.find((item)=> item.auth_id === 3);
                let dataTeacher = users?.find((item)=> item.auth_id === 2);
                let data = {
                    car_reg: result.car_reg,
                    car_no: result.car_no,
                    car_seat: result.car_seat,
                    driver: `${dataDriver.dataValues.user_fname} ${dataDriver.dataValues.user_lname}`,
                    teacher: `${dataTeacher.dataValues.user_fname} ${dataTeacher.dataValues.user_lname}`,
                }
                
                console.log(data);
                return res.render("Viewcar", { result: data })
            } else {

            }
        })
    })
}
