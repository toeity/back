const LeaveUser = require('../Models/LeaveUser');


exports.addLeaveUser = (req, res) => {
    const eventData = {
        user_id: req.userId, 
        leave_id: req.body.leave_id, 
        timestamp: req.body.timestamp
    }
    console.log(eventData)
    LeaveUser.create(eventData).then(result => {
        return res.status(200).json({
            response: "leaveuser create Success!!"
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "leaveuser cannot created!!!"
        })
    })
}

exports.getAllLeaveUser = (req, res) => {
    LeaveUser.findAll().then(result => {
        return res.status(200).json({
            response: result
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "leaveuser error!!!"
        })
    })
}