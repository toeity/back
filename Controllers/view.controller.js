const View = require('../Models/View');
exports.addView = (req,res) =>{
    const eventData = {
        view_type:req.body.view_type,
    }
    View.create(eventData).then(result=>{
        return res.status(200).json({
            response: "view create Success!!"
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "view cannot created!!!"
        })
    })
}

exports.getAllView = (req,res) =>{
    View.findAll().then(result=>{
        return res.status(200).json({
            response: result
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "view error!!!"
        })
    })
}