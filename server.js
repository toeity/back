const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('./Configs/server.config');
const { Op } = require('sequelize')
const db = require('./Database/DB');
const admin = require('firebase-admin');
const sessions = require('express-session');
const { getDatabase, ref, onValue } = require('firebase/database')
const firebase = require('./Controllers/firebase.controller')
const flash = require('connect-flash');
var serviceAccount = require("./project-firebase.json");
const path = require('path');
const cookieParser = require('cookie-parser');
const User = require('./Models/User');
const { default: axios } = require('axios');
const Noti = require('./Models/Noti');
const app = express();
db.sequelize.sync()
app.use(cors());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})
// Error session
app.use(sessions(
    {
        secret: 'iamgroot',
        resave: false,
        saveUninitialized: true,
        cookie: {

        }
    }
));
app.use(cookieParser())
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message;
    next();
})
//End Session

//For Websites
app.use(express.static(path.join(__dirname, "./Public")))
app.set('view engine', 'ejs');
// app.set("Views", path.join(__dirname, "./Views"))
// var corsOptions = {
//     origin: 'https://localhost:3000',
// }
// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// db.sequelize.sync();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-fbd57-default-rtdb.firebaseio.com"
});

// console.log(defaultApp); 
require('./Routes/auth.routes')(app);
require('./Routes/event.routes')(app);
require('./Routes/student.routes')(app);
require('./Routes/event_student.routes')(app);
require('./Routes/user.routes')(app);
require('./Routes/exportPDF.routes')(app);
require('./Routes/exportPDFevent.routes')(app);
require('./Routes/leave.routes')(app);
require('./Routes/leave_user.routes')(app);
require('./Routes/site.routes')(app);
require('./Routes/car.routes')(app);
require('./Routes/noti.routes')(app);

require('./Routes/exportPDFevent.routes')(app);

const database = getDatabase(firebase)
const pirRef = ref(database, '1/pir')
onValue(pirRef, async snap => {
    Noti.create({
        noti_time:new Date().toLocaleString().split(" ")[0],
        noti_static:snap.val()
    })
    if (snap.val() === 1) {
        const users = await User.findAll({
            where: {
                car_no: 1,
                auth_id: [1, 2, 3],
                token: {
                    [Op.not]: null
                }
            }
            
        })
        const expoNotificationURL = "https://exp.host/--/api/v2/push/send";
        Promise.all(users.map(user => (
            axios
                .post(expoNotificationURL, {
                    title: "Alert  C.I.T.C 📢 ",
                    subtitle: "แจ้งเตือน!!! พบเด็กตกค้างภายในรถ",
                    to: user.token,
                    body: 'กรุณาตรวจสอบรถหมายเลข 1',
                    sound: "default",
                })
        ))).then(result => {
            console.log(result.status);
            return true;
        })
    }

})
app.get('/getusers/:id', (req, res) => {
    var oneUser = userRef.child(req.params.id);
    oneUser.once('value', function (snap) {
        res.status(200).json({ "user": snap.val() })
    })
})

app.listen(config.PORT, config.HOST, () => console.log(config.HOST + ' listening on port' + config.PORT))
