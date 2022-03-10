const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('./Configs/server.config');
const db = require('./Database/DB');
const admin = require('firebase-admin');
var serviceAccount = require("./project-firebase.json");
const path = require('path');
const app = express();
app.use(cors());


//For Websites
app.use(express.static(path.join(__dirname,"./Public")))
app.set('view engine', 'ejs');
app.set("Views",path.join(__dirname,"./Views"))
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
require('./Routes/user.routes')(app);
require('./Routes/exportPDF.routes')(app);
require('./Routes/exportPDFevent.routes')(app);

require('./Routes/site.routes')(app);
require('./Routes/car.routes')(app); 

require('./Routes/exportPDFevent.routes')(app);

var dbFirebase = admin.database();
var userRef = dbFirebase.ref("users");
app.get('/getdb', (req, res) => {
    var oneUser = userRef.child("userdata1");
    const payload = {
        name: "Test1",
        phone: "0860993331" 
    }
    oneUser.update(payload, (err) => {
        if (err) {
            res.status(300).json({ "msg": "Something went wrong", "error": err });
        }
        else {
            res.status(200).json({ "msg": "user created sucessfully" });
        }
    })
})

app.get('/getusers/:id', (req, res) => {
    var oneUser = userRef.child(req.params.id);
    oneUser.once('value', function(snap) {
        res.status(200).json({ "user": snap.val()})
    })
})

app.listen(config.PORT,config.HOST, () => console.log(config.HOST+' listening on port' + config.PORT))
