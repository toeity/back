const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Childreninthecar@gmail.com', // your email
      pass: 'Inthecar12@' // your email password
    }
  });
  
  let mailOptions = {
    from: 'childreninthecar@gmail.com',               
    to: 'helloimtoey.bt@gmail.com',                
    subject: 'Hello from sender',              
    html:  //Do you receive this  mail?
    '<p>อนุมัติบัญชีสำเร็จ<br> คุณสามารถเข้าใช้งานแอปพลิเคชัน C.I.T.C ได้ตั้งแต่นี้เป็นต้นไป </p>' 
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });

 