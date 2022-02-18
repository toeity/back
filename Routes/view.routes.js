const controller = require('../Controllers/view.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.post(
        '/api/view',
        controller.addView
    );

    app.get('/api/view',controller.getAllView)
    
}