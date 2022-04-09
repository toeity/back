const config = require('../Configs/auth.config');
const User = require('../Models/User');
const Car = require('../Models/Car')
const Student = require('../Models/Student')
const {fn} = require('sequelize')
const jwt = require('jsonwebToken');
const bcrypt = require("bcryptjs");
const Auth = require('../Models/Auth');
exports.addAuth = (req, res) => {
    const eventData = {
        auth_name: req.body.auth_name,
    }
    Auth.create(eventData).then(result => {
        return res.status(200).json({
            response: "auth create Success!!"
        })
    }).catch(err => {
        return res.status(500).json({
            response: "auth cannot created!!!"
        })
    })
}

exports.register = (req, res) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const userData = {
        auth_id: req.body.auth_id,
        user_email: req.body.user_email,
        user_pass: bcrypt.hashSync(req.body.user_pass, 5),
        user_fname: req.body.user_fname,
        user_lname: req.body.user_lname,
        user_tel: req.body.user_tel
    }
    User.findOne({
        where: {
            // user_id: userData.user_id,
            user_email: userData.user_email

        }
    })
        .then((user) => {
            if (!user) {
                if (emailRegexp.test(userData.user_email) && req.body.user_pass.length >= 5) {
                    User.create(userData)
                        .then(() => {
                            res.status(200).json({
                                response: "user create Success!!"
                            })
                        })
                        .catch(err => {
                            res.status(500).json({ error: err })
                        })
                } else {
                    res.status(500).json({ error: "email Format incorrect or password incorrect" })
                }
            } else {
                res.status(500).json({ error: "user already exists" })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            user_email: req.body.user_email,
        },
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ massage: "User not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.user_pass, user.user_pass
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            await user.update({token:req.body.token})
            var token = jwt.sign({...user.toJSON()}, config.secret);
            res.status(200).json({
                accessToken: token,
                // role: user.auth_id,
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send({ message: err.message })
        });
}
exports.auth = (req, res) => {
    try {
        const token = req.headers['authorization'];
        if(!token) {
            return res.status(401).send({ message:'Unautherize'})
        }
        const {user_id} = jwt.decode(token, config.secret)
        User.belongsTo(Auth, {  foreignKey: 'auth_id' })
        User.findOne({
            where:{
                user_id:user_id
            },
            include:Auth
        }).then(user=>{
            return res.json(user)
        })
    } catch (err) {
        return res.status(500).send({ message: err.message })

    }

}

exports.getUserCountAll = function (req, res, next) {
    console.log('test');
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
                    result.userAll += d?.authCount??0;
                })
                return res.json(result)
            })
        })
    })
}

exports.editLogOut = (req, res) => {
    User.findOne({
        where: {
            user_id: req.userId,
        },
    })
        .then(async (user) => {
            console.log(user.user_id +" is logout");
            await user.update({token:null})
            return res.json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send({ message: err.message })
        });
}
