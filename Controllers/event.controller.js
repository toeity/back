const Event = require('../Models/Event');
exports.addEvent = (req,res) =>{
    const eventData = {
        event_name:req.body.event_name,
    }
    Event.create(eventData).then(result=>{
        return res.status(200).json({
            response: "event create Success!!"
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "event cannot created!!!"
        })
    })
}

exports.getAllEvent = (req,res) =>{
    Event.findAll().then(result=>{
        return res.status(200).json({
            response: result
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "event error!!!"
        })
    })
}