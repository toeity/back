const controller = require('../Controllers/student.controller');
const { authJwt } = require('../Middleware');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/student',
        controller.addStudent
    );

    // app.get('/api/student',controller.getAllStudentBoss)
    app.get('/api/student/:car_no',controller.getAllStudent)
    app.get('/api/studentByParent/:user_id',controller.studentByParent)
    

}