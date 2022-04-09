const Leave = require('../Models/Leave');
exports.addLeave = (req,res) =>{
    const eventData = {
        leave_name:req.body.leave_name
    }
    Leave.create(eventData).then(result=>{
        return res.status(200).json({
            response: "leave create Success!!"
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "leave cannot created!!!"
        })
    })
}

exports.getAllLeave = (req,res) =>{
    Leave.findAll().then(result=>{
        return res.status(200).json({
            response: result
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "leave error!!!"
        })
    })
}