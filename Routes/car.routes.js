const controller = require('../Controllers/car.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/car',
        controller.addCar
    ); 
    app.get('/api/car',controller.getAllCarBoss)

    app.get('/api/car/:car_no',controller.getAllCar)
    
    app.get(
        '/api/car_user/:car_no',
        controller.getCarUser);
    
}