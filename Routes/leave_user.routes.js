const controller = require('../Controllers/leaveuser.controllers');
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
        '/api/leave_user',
        [authJwt.verifyToken],
        controller.addLeaveUser
    );
    
    app.get('/api/',controller.getAllLeaveUser)
    
}