const controller = require('../Controllers/event.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/event',
        controller.addEvent
    );

    app.get('/api/event',controller.getAllEvent)
    
}