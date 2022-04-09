const controller = require('../Controllers/auth.controller');
const { verifyToken } = require('../Middleware/authJwt');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        '/api/auth/login',
        controller.login
    );
    app.post('/api/auth/register', controller.register);
    app.get('/api/auth/',controller.auth);
    app.get('/api/auth/auth_all',controller.getUserCountAll);

    app.get('/api/auth/logout',[verifyToken],controller.editLogOut);

}


