const Student = require('../Models/Student');
const User = require('../Models/User')
exports.addStudent = (req, res) => {
    const eventData = {
        stu_fname: req.body.stu_fname, stu_lname: req.body.stu_lname, stu_address: req.body.stu_address, user_id: req.body.user_id, stdId: req.body.stdId
    }
    Student.create(eventData).then(result => {
        return res.status(200).json({
            response: "student create Success!!"
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "student cannot created!!!"
        })
    })
}

exports.getAllStudent = (req, res) => {
    const { car_no } = req.params
    console.log(car_no, req.params);
    Student.belongsTo(User, { foreignKey: 'user_id' })
    Student.findAll(
        {
            include: {
                model: User, 
                where: { car_no }
                , required: true
            }
        }
    ).then(result => {
        console.log(result);
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "student error!!!"
        })
    })
}

exports.getAllStudent = (req, res) => {
    const { car_no } = req.params
    console.log(car_no, req.params);
    Student.belongsTo(User, { foreignKey: 'user_id' })
    Student.findAll(
        {
            include: {
                model: User, 
                where: { car_no }
                , required: true
            }
        }
    ).then(result => {
        console.log(result);
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "student error!!!"
        })
    })
}

exports.studentByParent = (req, res) => {
    const { user_id } = req.params
    console.log(user_id, req.params);
    Student.findAll(
        {
            where: { user_id }
        }
    ).then(result => {
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "student error!!!"
        })
    })
}