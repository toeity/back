const controller = require('../Controllers/leave.controllers');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/leave',
        controller.addLeave
    );
    


    app.get('/api/',controller.getAllLeave)
    
}