
const controller = require('../Controllers/site.controller');
const db = require('../Database/DB');

module.exports = function(app){
    
    app.get('/Login', controller.LoginPage);
    // app.get('/Register', controller.RegisterPage);
    app.get('/Home', controller.HomePage); 
    
    app.get('/Requestuser', controller.RequestuserPage);
    app.get('/Requestuser/:user_id',controller.ReqUser);
    app.post("/delete-usersix",controller.DeleteUsersixAction);
    app.get('/Viewrequestuser',controller.ViewrequestuserPage);
    
    app.get('/Authuser',controller.AuthuserPage);
    
    // 
    app.get('/Adduser',controller.AdduserPage);
    app.post('/Adduser',controller.AddUserAction);
    app.post("/delete-user",controller.DeleteUserAction);
    
    //edit
    app.get('/Edituser/:user_id',controller.EdituserPage); 
    app.post('/Edituser/',controller.EdituserAction);
    app.get('/Viewuser/:user_id',controller.ViewuserPage);
    
    app.get('/Cardata', controller.CardataPage);

    app.get('/Addcar',controller.AddcarPage);
    app.post('/Addcar',controller.AddCarAction);
    app.post("/delete-car",controller.DeleteCarAction);

    app.get('/Editcar/:car_no',controller.EditcarPage);
    app.post('/Editcar',controller.EditcarAction);
    app.get('/Viewcar/:car_no',controller.ViewcarPage);

    app.get('/Leaveinfo', controller.LeaveinfoPage);
    app.get('/Leaveedit/:car_no',controller.LeaveeditPage);
    app.post('/Leaveedit/:car_no',controller.LeaveeditAction);
    app.get('/*', (req,res)=>{
        return res.redirect('/home');
    })

}


// <main class="main">
// <div class="card">
//   <h2>
//   <ion-icon name="create-outline" class="icon"></ion-icon>แก้ไขสิทธิ์ผู้ใช้
// </h2>
// <form method="post" action="/Editcar">

//   <div class="form-group col-md-12">

//     <label for="inputAddress">ทะเบียนรถ</label> <br>

//     <input type="text" class="form-control" name="car_reg" id="car_reg" value="<%=result.car_reg%>">
//   </div>
//   <div class="form-group col-md-12">
//     <label for="inputPassword4">หมายเลขรถ</label>
//     <input type="text" class="form-control" name="car_no" id="car_no" " value=" <%=result.car_no%>" >
//   </div>

//   <div class="form-group col-md-12">
//     <label for="inputEmail4">จำนวนที่นั่ง</label>
//     <input type="text" class="form-control" name="car_seat" id="car_seat" value="<%=result.car_seat%>">
//   </div>
//   <div class="form-group col-md-12">
//     <label for="inputPassword4">คนขับรถ</label>
//     <select class="form-control" name="user_driver" id="user_driver">
//       <%result.filter(item=>item.auth_id == 3).forEach(item=>{%>
//         <option value="<%=item.user_id%>" "<%=teacher.user_id==item.user_id ?? 'selected'%>">
//           <%=item.user_fname%>
//             <%=item.user_lname%>
//         </option>
//         <%})%>
//     </select>
//   </div>
//   <div class="form-group col-md-12">
//     <label for="inputAddress">ครูประจำรถ</label>
//     <select class="form-control" name="user_teacher" id="user_teacher">
//       <%result.filter(item=>item.auth_id == 2).forEach(item=>{%>
//         <option value="<%=item.user_id%>" "<%=teacher.user_id==item.user_id ?? 'selected'%>">
//           <%=item.user_fname%>
//             <%=item.user_lname%>
//             <%=teacher.user_id==item.user_id%>
//             "<%=teacher.user_id==item.user_id && 'selected'%>"
//         </option>
//         <%})%>
//     </select>
//   </div>


//   <div class="col-md-6">
//     <button type="button" onclick="carEdit()" style="width: 60px; height: 30px; margin-right: 10px;"
//       class="btn btn-info">ตกลง</button>
//     <input type="submit" name="car_no" value="<%=result.car_no%>" id="form-edit" hidden="true" />
//     <a style="width: 60px; height: 30px" href="http://localhost:5001/Cardata" role="button"
//       class="btn btn-warning">ยกเลิก</a>
//   </div>
// </form>
// </main>