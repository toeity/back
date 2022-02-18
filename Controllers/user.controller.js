const User = require('../Models/User');
exports.addUser = (req,res) =>{
    const eventData = {
        user_email:req.body.user_email,user_pass:req.body.user_pass,auth_id:req.body.auth_id,user_fname:req.body.user_fname,user_lname:req.body.user_lname,
    }
    User.create(eventData).then(result=>{
        return res.status(200).json({
            response: "user create Success!!"
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "user cannot created!!!"
        })
    })
}

exports.getAllUser = (req,res) =>{
    User.findAll().then(result=>{
        return res.status(200).json({
            response: result
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "user error!!!"
        })
    })
}