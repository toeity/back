const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('./Configs/server.config');
const db = require('./Database/DB');

const app = express();

// var corsOptions = {
//     origin: 'https://localhost:3000',
// }
// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
db.sequelize.sync();

require('./Routes/auth.routes')(app);
app.get('/', (req,res) =>{
    return res.json({server: "Hello"});
})

app.listen(config.PORT , () => console.log('listening on port' + config.PORT))
