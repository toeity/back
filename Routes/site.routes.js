
const controller = require('../Controllers/site.controller');
const db = require('../Database/DB');

module.exports = function(app){
    app.get('/Login', controller.LoginPage);
    // app.get('/Register', controller.RegisterPage);
    app.get('/Home', controller.HomePage); 
    
    app.get('/Requestuser', controller.RequestuserPage);
    app.get('/Viewrequestuser',controller.ViewrequestuserPage);
    
    app.get('/Authuser',controller.AuthuserPage);
    
    // AddUser
    app.get('/Adduser',controller.AdduserPage);
    app.post('/Adduser',controller.AddUserAction);
    app.post("/delete-user",controller.DeleteUserAction);
    
    // 
    app.get('/Edituser/:user_id',controller.EdituserPage);
    app.get('/Viewuser/:user_id',controller.ViewuserPage);
    
    app.get('/Cardata', controller.CardataPage);

    app.get('/Addcar',controller.AddcarPage);
    app.post('/Addcar',controller.AddCarAction);
    app.post("/delete-car",controller.DeleteCarAction);

    app.get('/Editcar/:car_no',controller.EditcarPage);
    app.get('/Viewcar/:car_no',controller.ViewcarPage);

    app.get('/Leaveinfo', controller.LeaveinfoPage);

}