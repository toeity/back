
const controller = require('../Controllers/exportPDF.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
       next();
    });
    app.get('/generateReport', controller.generatePDFTemplate1);
    // app.get('/generateReport', controller.generatePDFTemplate1);
    app.get('/view/get-pdf/:id', controller.getPDF);
}