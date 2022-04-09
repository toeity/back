const controller = require('../Controllers/noti.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/noti',
        controller.addNoti    
    );

    app.get('/api/noti/',controller.getAllNoti)
    app.get('/api/noti/noti_all',controller.getAllNotiCount)
   
}