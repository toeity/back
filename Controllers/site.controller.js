const Car = require("../Models/Car");
const User = require("../Models/User");
const Auth = require("../Models/Auth");
const Student = require("../Models/Student");
const { Op, and, fn, col } = require("sequelize")
const bcrypt = require("bcryptjs");
const { auth } = require("firebase-admin");
const LeaveUser = require("../Models/LeaveUser");
const Leave = require("../Models/Leave");
const Noti = require("../Models/Noti");

exports.LoginPage = function (req, res) {
    return res.render('Login');
}

exports.RegisterPage = function (req, res) {
    return res.render("Register")
}

exports.HomePage = function (req, res, next) {
    User.belongsTo(Auth, { foreignKey: 'auth_id' });
    Auth.hasMany(User, { foreignKey: 'auth_id' });
    Car.findAll({
        attributes: [
            [fn('count', 'car_reg'), 'carCount']
        ]
    }).then((car) => {
        User.findAll({
            attributes: [
                [fn('count', 'auth_id'), 'authCount'], 'auth_id'
            ],
            group: ['auth_id'],
            order: ['auth_id']
        }).then((user) => {
            Student.findAndCountAll().then((std) => {
                var result = {
                    car: car[0].dataValues,
                    student: std.count,
                    user: [
                        user[0]?.dataValues,
                        user[1]?.dataValues,
                        user[2]?.dataValues,
                        user[3]?.dataValues,
                        user[4]?.dataValues,
                        user[5]?.dataValues,
                    ],
                    userAll: 0
                }
                result.user.forEach((d, index) => {
                    result.userAll += d?.authCount ?? 0;
                })
                Noti.findAll({
                    attributes: [
                        [fn('count', col('noti_id')), 'notiCount'],
                        [fn('month', fn('str_to_date', col('noti_time'), '%d/%m/%Y')), 'month']
                    ],
                    
                    group: ['month'],
                    where: {
                        noti_static:1
                    }
                }).then(noti => {
                    let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    noti.forEach(n=>{
                        let value = n.toJSON();
                        data[value.month-1] = value.notiCount;
                    })
                    
                    
                console.log(data);
                    return res.render("Home", { result: result, noti: data ,allAccident:(data.reduce((sum,num)=>sum+num))})
                })
            })
        })
    })
}


exports.LeaveinfoPage = function (req, res) {
    User.belongsToMany(Leave, { foreignKey: 'user_id', through: LeaveUser })
    Leave.belongsToMany(User, { foreignKey: 'leave_id', through: LeaveUser })
    // await LeaveUser.update({
    //     leave_type: 1
    // }, {
    //     where: {
    //         id: req.params.id,
    //         leave_type: 0
    //     }
    // })
    User.belongsTo(Auth, { foreignKey: 'auth_id' })
    User.findAll({
        raw: true, include: [Auth, { model: Leave, required: true }], where: {
            auth_id: [2, 3]
        }
    }).then(function (result) {
        console.log(result);
        return res.render("Leaveinfo", { result: JSON.stringify(result) })
    })
    // return res.render("Leaveinfo")
}

// exports.LeaveUser = async function (req, res) {
//     const user = await User.findOne({
//         where: { user_id: req.params.user_id }
//     })
//     sendMail('allowLeave', user.user_email)
//     await LeaveUser.update({
//         Leave_type: 1
//     }, {
//         where: {
//             user_id: req.params.user_id,
//            Leave_type: 0
//         }
//     })

//     return res.redirect('/Leaveinfo');
// }

exports.LeaveeditPage = function (req, res) {
    User.findAll().then(async function (result) {
        const cars = await Car.findOne({ where: { car_no: req.params.car_no } })
        const teacher = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 2 } });
        const driver = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 3 } });
        return res.render("Leaveedit", { result, cars, teacher, driver })
    })
}
exports.LeaveeditAction = function (req, res) {
    console.log("Leaveedit action, ", req.body)
    var userUpdate = [
        {
            user_id: parseInt(req.body.user_driver),
            car_no: parseInt(req.body.car_no),
        },
        {
            user_id: parseInt(req.body.user_teacher),
            car_no: parseInt(req.body.car_no)
        }
    ];
    User.findAll({ where: { car_no: req.body.car_no } }).then((users) => {
        users.forEach((dataUser) => {
            let checkUser = userUpdate.find((dataUp) => dataUp.user_id == dataUser.dataValues.user_id);
            if (!checkUser) {
                userUpdate.push({
                    user_id: dataUser.dataValues.user_id,
                    car_no: null
                })
            }
        })
        console.log("userUpdate", userUpdate)
        Car.update({ car_reg: req.body.car_reg, car_seat: req.body.car_seat }, { where: { car_no: req.body.car_no } }).then(() => {
            // console.log(users)
            // if(req.body.user_driver != )
            User.bulkCreate(userUpdate, { updateOnDuplicate: ['user_id', 'car_no'] }).then(async () => {
                req.session.message = "success"
                // await LeaveUser.update({

                //     leave_type: 1
                // }, {
                //     where: {
                //         user_id: req.params.user_id,
                //         leave_type: 0
                //     }
                // })
                // sendMail('allowLeave', data.user_email) 
                return res.redirect('/Leaveedit/' + req.body.car_no)

            })
        })
    }).catch(err => {
        req.session.message = "error"
        sendMail('allownotLeave', data.user_email)
        return res.redirect('/Leaveeditr/' + req.body.car_no)
    })
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

exports.ReqUser = async function (req, res) {
    const user = await User.findOne({
        where: { user_id: req.params.user_id }
    })
    sendMail('allowAuth', user.user_email)
    await User.update({
        auth_id: 1
    }, {
        where: {
            user_id: req.params.user_id,
            auth_id: 6
        }
    })

    return res.redirect('/Requestuser');
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
exports.DeleteUsersixAction = function (req, res) {
    try {
        User.findOne({ where: { user_id: req.body.user_id } }).then((data) => {
            sendMail('allownotAuth', data.user_email)
            User.destroy({ where: { user_id: req.body.user_id } }).then(() => {

                return res.redirect('/Requestuser')
            })
        })
    } catch (err) {
        next(err)
    }
}

const sendMail = function (type, to) {
    const nodemailer = require('nodemailer');
    let template = ''
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Childreninthecar@gmail.com', // your email
            pass: 'Inthecar12@' // your email password
        }
    });
    // allowAuth && allownotAuth
    if (type === 'allowAuth') {
        template = `<p>อนุมัติบัญชีสำเร็จ<br> 
        ถึง คุณ${to} อนุมัติบัญชีสำเร็จ คุณสามารถเข้าใช้งานแอปพลิเคชัน C.I.T.C ได้ </p>`;
    }
    else if (type === 'allownotAuth') {
        template = `<p>อนุมัติบัญชีไม่สำเร็จ<br> 
        ถึง คุณ${to} อนุมัติบัญชีไม่สำเร็จ คุณไม่สามารถเข้าใช้งานแอปพลิเคชัน C.I.T.C ได้ กรุณาตรวจสอบอีกครั้ง</p>`;
    }
    else if (type === 'allowLeave') {
        template = `<p>อนุมัติการลาสำเร็จ<br> 
        ถึง คุณ${to} การอนุมัติในการลาหยุดในช่วง${leave_name}สำเร็จ</p>`;
    }
    else if (type === 'allownotLeave') {
        template = `<p>อนุมัติการลาไม่สำเร็จ<br> 
        ถึง คุณ${to} การอนุมัติในการลาหยุดในช่วง${leave_name}ไม่สำเร็จ</p>`;
    }
    let mailOptions = {
        from: 'childreninthecar@gmail.com',
        to: to,
        subject: 'Hello from Children in the car',
        html: template
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

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
        return res.render("Authuser", { result: JSON.stringify(result) })
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
    User.create({ ...req.body, user_pass: bcrypt.hashSync(req.body.user_pass, 5) }).then((result) => {
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
exports.EdituserAction = function (req, res) {
    User.update({ ...req.body, user_pass: bcrypt.hashSync(req.body.user_pass, 5) }, { where: { user_id: req.body.user_id } }).then((result) => {
        req.session.message = "success"

        return res.redirect('/Edituser/' + req.body.user_id)
    }).catch(err => {
        req.session.message = "error"
        return res.redirect('/Edituser/' + req.body.user_id)
    })
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
        return res.render("Addcar", { result })
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
    User.findAll().then(async function (result) {
        const cars = await Car.findOne({ where: { car_no: req.params.car_no } })
        const teacher = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 2 } });
        const driver = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 3 } });
        return res.render("Editcar", { result, cars, teacher, driver })
    })


}
exports.EditcarAction = function (req, res) {
    console.log("Edit car action, ", req.body)
    var userUpdate = [
        {
            user_id: parseInt(req.body.user_driver),
            car_no: parseInt(req.body.car_no),
        },
        {
            user_id: parseInt(req.body.user_teacher),
            car_no: parseInt(req.body.car_no)
        }
    ];
    User.findAll({ where: { car_no: req.body.car_no } }).then((users) => {
        users.forEach((dataUser) => {
            let checkUser = userUpdate.find((dataUp) => dataUp.user_id == dataUser.dataValues.user_id);
            if (!checkUser) {
                userUpdate.push({
                    user_id: dataUser.dataValues.user_id,
                    car_no: null
                })
            }
        })
        console.log("userUpdate", userUpdate)
        Car.update({ car_reg: req.body.car_reg, car_seat: req.body.car_seat }, { where: { car_no: req.body.car_no } }).then(() => {
            // console.log(users)
            // if(req.body.user_driver != )
            User.bulkCreate(userUpdate, { updateOnDuplicate: ['user_id', 'car_no'] }).then(() => {
                req.session.message = "success"
                return res.redirect('/Editcar/' + req.body.car_no)
            })
        })
    }).catch(err => {
        req.session.message = "error"
        return res.redirect('/Editcar/' + req.body.car_no)
    })
}


exports.ViewcarPage = function (req, res) {
    User.findAll().then(async function (result) {
        const cars = await Car.findOne({ where: { car_no: req.params.car_no } })
        const teacher = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 2 } });
        const driver = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 3 } });
        return res.render("Viewcar", { result, cars, teacher, driver })
    })
    // Car.hasMany(User, { foreignKey: 'car_no' })
    // User.findAll().then((users) => {
    //     Car.findOne({ raw: true, where: { car_no: req.params.car_no } }).then(function (result) {
    //         if (!!result) {

    //             // console.log(data);
    //             return res.render("Viewcar", { result: data })
    //         } else {

    //         }
    //     })
    // })
}
