const bcryptjs = require('bcryptjs');
const User = require('../Models/User');
exports.addUser = (req, res) => {
    const eventData = {
      user_email: req.body.user_email, user_pass: req.body.user_pass, auth_id: req.body.auth_id, user_fname: req.body.user_fname, user_lname: req.body.user_lname, user_tel: req.body.user_tel, car_no: req.body.car_no,
    }
    User.create({...eventData,user_pass:bcryptjs.hashSync(eventData.user_pass, 10)}).then(result => {
        return res.status(200).json({
            response: "user create Success!!",
            result
        })  
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "user cannot created!!!"
        })
    })
}
exports.editUser = (req, res) => {
    const eventData = {
      user_email: req.body.user_email, user_pass: req.body.user_pass, auth_id: req.body.auth_id, user_fname: req.body.user_fname, user_lname: req.body.user_lname, user_tel: req.body.user_tel, car_no: req.body.car_no,
    }
    
    User.update({...eventData,user_pass:bcryptjs.hashSync(eventData.user_pass, 10)},{where:{user_id:req.body.user_id}}).then(result => {
        return res.status(200).json({
            response: "user edit Success!!",
            result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "user cannot edited!!!"
        })
    })
}

exports.getAllUser = (req, res) => {
    User.findAll().then(result => {
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "user error!!!"
        })
    })
}