
const controller = require('../Controllers/site.controller');

module.exports = function(app){
    app.get('/Login', controller.LoginPage);
    app.get('/Home', controller.HomePage);
    app.get('/Cardata', controller.CardataPage)
}