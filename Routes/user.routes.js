const controller = require('../Controllers/user.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/user',
        controller.addUser
    );

    app.get('/api/user',controller.getAllUser)
    
}