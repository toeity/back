const Car = require("../Models/Car");
const User = require("../Models/User");
const Auth = require("../Models/Auth");
const Student = require("../Models/Student");
const { Op, and , fn} = require("sequelize")
const bcrypt = require("bcryptjs");

exports.LoginPage = function (req, res) {
    return res.render('Login');
} 

exports.RegisterPage = function (req, res) {
    return res.render("Register")
}

exports.HomePage = function (req, res,next) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' });
    Auth.hasMany(User, { foreignKey: 'auth_id'});
    Car.findAll({
        attributes: [
            [fn('count','car_reg'),'carCount']
        ]
    }).then((car) => {
        User.findAll({
            attributes: [
                [fn('count','auth_id'),'authCount'],'auth_id'
            ],
            group: ['auth_id'],
            order: ['auth_id']
        }).then((user) => {
            Student.findAndCountAll().then((std) => {
                var result = {
                    car: car[0].dataValues,
                    student: std.count,
                    user: [
                        user[0].dataValues,
                        user[1].dataValues,
                        user[2].dataValues,
                        user[3].dataValues,
                        user[4].dataValues,
                        user[5].dataValues
                    ], 
                    userAll: 0
                }
                result.user.forEach((d, index) => {
                    result.userAll += d.authCount;
                })
                console.log(result);
                return res.render("Home" ,{ result: result})
            })
        })
    })
}

exports.LeaveinfoPage = function (req, res) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' })
    User.findAll({
        raw: true, include: Auth, where: {
            auth_id: 2 && 3
        }
    }).then(function (result) {
        return res.render("Leaveinfo", { result: JSON.stringify(result) })
    })
    // return res.render("Authuser")
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
        // console.log(data);
        return res.render("Cardata", { result: JSON.stringify(data) })
    })
    // return res.render("Cardata")
}

exports.DeleteCarAction = function (req, res) {
    try {
        Car.destroy({ where: { car_no: req.body.car_no } }).then(() => {
            res.redirect('/Cardata')
        })
    } catch (err) {
        next(err)
    }
}

exports.RequestuserPage = function (req, res) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' })
    User.findAll({
        raw: true, include: Auth, where: {
            auth_id: 6
        }
    }).then(function (result) {
        return res.render("Requestuser", { result: JSON.stringify(result) })
    })

}


exports.ViewrequestuserPage = function (req, res) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' })
    User.findOne({
        raw: true, where: { user_id: req.params.user_id }, include: Auth, where: {
            auth_id: 6
        }
    }).then(function (result) {
        // console.log(result)
        return res.render("Viewrequestuser", { result: result })

    })
}


exports.AuthuserPage = function (req, res) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' })
    User.findAll({
        raw: true, include: Auth, where: {
            auth_id: {
                [Op.not]: 6
            }
        }
    }).then(function (result) {
        return res.render("Authuser", { result: JSON.stringify(result)})
    })
    // return res.render("Authuser")
}
exports.DeleteUserAction = function (req, res) {
    try {
        User.destroy({ where: { user_id: req.body.user_id } }).then(() => {
            res.redirect('/Authuser')
        })
    } catch (err) {
        next(err)
    }
}
exports.AdduserPage = function (req, res) {
    User.findAll({ raw: true }).then(function (result) {
        return res.render("Adduser", { result: JSON.stringify({ result }) })
    })
    // return res.render("Authuser")
}

exports.AddUserAction = function (req, res) {
    User.create({...req.body,user_pass: bcrypt.hashSync(req.body.user_pass, 5)}).then((result) => {
        req.session.message = "user added"

        return res.redirect('/Adduser')
    }).catch(err => {
        return res.redirect('/Adduser')
    })
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
        // console.log(result)
        return res.render("Viewuser", { result: result })
    })
    // return res.render("Authuser")
}



exports.AddcarPage = function (req, res) {
    User.findAll({ raw: true }).then(function (result) {
        console.log(result);
            return res.render("Addcar", { result  })
    })
}

exports.AddCarAction = async function (req, res) {
    try {
        const car = await Car.create(req.body)
        console.log(car)
        await User.update({
            auth_id: 2,
            car_no: car.car_no
        }, {
            where: { user_id: req.body.user_teacher }
        })
        await User.update({
            auth_id: 3,
            car_no: car.car_no
        }, {
            where: { user_id: req.body.user_driver }
        })

        return res.redirect('/Addcar')
    } catch (e) {
        console.log(e)
        return res.redirect('/Addcar')
    }

}

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
                let dataDriver = users?.find((item) => item.auth_id === 3);
                let dataTeacher = users?.find((item) => item.auth_id === 2);
                let data = {
                    car_reg: result.car_reg,
                    car_no: result.car_no,
                    car_seat: result.car_seat,
                    driver: `${dataDriver.dataValues.user_fname} ${dataDriver.dataValues.user_lname}`,
                    teacher: `${dataTeacher.dataValues.user_fname} ${dataTeacher.dataValues.user_lname}`,
                }

                // console.log(data);
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
                let dataDriver = users?.find((item) => item.auth_id === 3);
                let dataTeacher = users?.find((item) => item.auth_id === 2);
                let data = {
                    car_reg: result.car_reg,
                    car_no: result.car_no,
                    car_seat: result.car_seat,
                    driver: `${dataDriver.dataValues.user_fname} ${dataDriver.dataValues.user_lname}`,
                    teacher: `${dataTeacher.dataValues.user_fname} ${dataTeacher.dataValues.user_lname}`,
                }

                // console.log(data);
                return res.render("Viewcar", { result: data })
            } else {

            }
        })
    })
}
