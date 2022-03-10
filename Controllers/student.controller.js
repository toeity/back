const Student = require('../Models/Student');
exports.addStudent = (req,res) =>{
    const eventData = {
        stu_fname:req.body.stu_fname, stu_lname:req.body.stu_lname,stu_address:req.body.stu_address,user_id:req.body.user_id,stdId:req.body.stdId
    }
    Student.create(eventData).then(result=>{
        return res.status(200).json({
            response: "student create Success!!"
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "student cannot created!!!"
        })
    })
}



exports.getAllStudent = (req,res) =>{
    Student.findAll().then(result=>{
        return res.status(200).json({
            response: result
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "student error!!!"
        })
    })
}