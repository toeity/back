const controller = require('../Controllers/eventstudent.controllers');
const { authJwt } = require('../Middleware')
 
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/event_student',
        [authJwt.verifyToken],
        controller.addEventStudent
    );

    app.put(
        '/api/event_student',
        controller.putEventStudent
    );

    app.get(
        '/api/event_student/',
        controller.getAllEventStudent
    );

    app.get(
        '/api/event_student_one',
        controller.getAllEventStudentOne);

    app.get(
        '/api/event_studenttoBoss/:car_no',
            controller.getAllEventStudentToBoss);
        
}