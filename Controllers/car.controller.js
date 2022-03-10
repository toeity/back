const Car = require('../Models/Car');
exports.addCar = (req,res) =>{
    const carData = {
        car_reg:req.body.car_reg,
        car_seat:req.body.car_seat,
        car_no:req.body.car_no

    }
    Car.create(carData).then(result=>{
        return res.status(200).json({
            response: "car create Success!!"
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "car cannot created!!!"
        })
    })
}

exports.getAllCar = (req,res) =>{
    Car.findAll().then(result=>{
        return res.status(200).json({
            response: result
        })
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({
            response: "Car error!!!"
        })
    })
}