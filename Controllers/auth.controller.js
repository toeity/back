const config = require('../Configs/auth.config');
const User = require('../Models/User');
const jwt = require('jsonwebToken');
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const userData = {
        par_id: req.body.par_id,
        par_fname: req.body.par_fname,
        par_lname: req.body.par_lname,
        fam_sta_id: req.body.fam_sta_id,
        par_tel: req.body.par_tel,
        par_email: req.body.par_email,
        par_pass: bcrypt.hashSync(req.body.par_pass,15) ,
        stu_id: req.body.stu_id,
    }
    User.findOne({
        where:{
            par_id: userData.par_id,
            par_email : userData.par_email

        }
    })
    .then((user) => {
        if(!user){
            if(emailRegexp.test(userData.par_email) && req.body.par_pass.length >= 15 )
        {
            User.create(userData)
            .then(() => {
                res.status(200).json({
                    response: "user create Success!!"
                })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
        }else{
            res.status(500).json({error: "email Format incorrect or password incorrect"})
        }
    }else{
        res.status(500).json({error: "user already exists"})
    }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
};

exports.login = (req, res) => {
    User.findOne({
        where: {par_email: req.params.email
        }
    })
    .then((user) => {
        if(!user){
            return res.status(404).send({massage: "User not found."});
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.userPassword, par_pass
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken:null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({id: user.id}, config.secret,{
            expiresIn: 86400 //24 hours
        });
        res.status(200).json({
            accessToken:token,
        })
    })
    .catch((err) => {
        res.status(500).send({message: err.message})
    });
}