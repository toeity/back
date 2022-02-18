
const controller = require('../Controllers/exportPDFevent.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.get('/generateReportEvent', controller.generatePDFTemplate2);
    // app.get('/generateReportEvent', controller.generatePDFTemplate2);
    app.get('/view/get-pdf/:id', controller.getPDF);
}