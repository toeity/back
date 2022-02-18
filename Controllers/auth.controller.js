const config = require('../Configs/auth.config');
const User = require('../Models/User');
const jwt = require('jsonwebToken');
const bcrypt = require("bcryptjs");
const Auth = require('../Models/Auth');
exports.addAuth = (req,res) =>{
    const eventData = {
        auth_name:req.body.auth_name,
    }
    Auth.create(eventData).then(result=>{
        return res.status(200).json({
            response: "auth create Success!!"
        })
    }).catch(err=>{
        return res.status(500).json({
            response: "auth cannot created!!!"
        })
    })
}



exports.register = (req, res) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const userData = {
        auth_id: req.body.auth_id,
        user_id: req.body.user_id,
        user_email: req.body.user_email,
        user_pass: bcrypt.hashSync(req.body.user_pass,15) ,
    }
    User.findOne({
        where:{
            // user_id: userData.user_id,
            user_email : userData.user_email

        }
    })
    .then((user) => {
        if(!user){
            if(emailRegexp.test(userData.user_email) && req.body.user_pass.length >= 5 )
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
        where: {user_email: req.body.user_email,
        }
    })
    .then((user) => {
        if(!user){
            return res.status(404).send({massage: "User not found."});
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.user_pass, user.user_pass
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