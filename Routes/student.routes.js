const controller = require('../Controllers/student.controller');

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


    app.get('/api/student',controller.getAllStudent)
    
}