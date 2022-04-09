const Car = require('../Models/Car');
const User = require('../Models/User');
exports.addCar = (req, res) => {
    const carData = {
        car_reg: req.body.car_reg, 
        car_seat: req.body.car_seat,
        car_no: req.body.car_no
 
    }
    Car.create(carData).then(result => {
        return res.status(200).json({
            response: "car create Success!!"
        })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            response: "car cannot created!!!"
        })
    })
}

exports.getAllCarBoss = (req,res) => {
    Car.hasMany(User, { foreignKey: 'car_no' })
    User.belongsTo(Car,{foreignKey:'user_id'})
    Car.findAll({ include: { model: User, require: true } }).then(result=>{
        let data = result.map(item => (
            {
                car_reg: item.car_reg,
                car_no: item.car_no,
                car_seat: item.car_seat,
                driver: item.users?.find(user => user.auth_id === 3),
                teacher: item.users?.find(user => user.auth_id === 2)
            }
        ))
        return res.status(200).json({
            response: data
        })
    }).catch(err=>{
        console.log(err); 
        return res.status(500).json({
            response: "Car error!!!"
        })
    })
}

exports.getAllCar = (req,res) =>{
    const { car_no } = req.params
    console.log(car_no, req.params);
    Car.hasMany(User, { foreignKey: 'car_no' })
    User.belongsTo(Car,{foreignKey:'user_id'})
    Car.findAll({ include: { model: User,  where: { car_no }, require: true } }).then(result=>{
        let data = result.map(item => (
            {
                car_reg: item.car_reg,
                car_no: item.car_no,
                car_seat: item.car_seat,
                driver: item.users?.find(user => user.auth_id === 3),
                teacher: item.users?.find(user => user.auth_id === 2)
            }
        ))
        return res.status(200).json({
            response: data
        })
    }).catch(err=>{
        console.log(err); 
        return res.status(500).json({
            response: "Car error!!!"
        })
    })
}

exports.getCarUser = (req,res) => {
User.findAll().then(async function (result) {
    const cars = await Car.findOne({ where: { car_no: req.params.car_no } })
    const teacher = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 2 } });
    const driver = await User.findOne({ where: { car_no: req.params.car_no, auth_id: 3 } });
    // console.log({result, cars, teacher, driver});
    return res.status(200).json({
        response: { result, cars, teacher, driver }
    })   
}).catch(err=>{
    console.log(err);
    return res.status(500).json({
        response: "CarUser error!!!"
    })
})
}