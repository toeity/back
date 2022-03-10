
const controller = require('../Controllers/site.controller');

module.exports = function(app){
    app.get('/Login', controller.LoginPage);
    // app.get('/Register', controller.RegisterPage);
    app.get('/Home', controller.HomePage);
    
    app.get('/Requestuser', controller.RequestuserPage);
    app.get('/Viewrequestuser',controller.ViewrequestuserPage);
    
    app.get('/Authuser',controller.AuthuserPage);
    app.get('/Adduser',controller.AdduserPage);
    app.get('/Edituser/:user_id',controller.EdituserPage);
    
    app.get('/Viewuser/:user_id',controller.ViewuserPage);
    
    
    app.get('/Cardata', controller.CardataPage);
    app.get('/Addcar',controller.AddcarPage);
    app.get('/Editcar/:car_no',controller.EditcarPage);
    app.get('/Viewcar/:car_no',controller.ViewcarPage);
}