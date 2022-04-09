const jwt = require('jsonwebtoken');
const config = require('../Configs/auth.config');
const db = require('../Database/DB');

var verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if(!token) {
        return res.status(401).send({message: "No token provided!" });
    }
    const tokenBearer = token.split(" ")[1];
    jwt.verify(tokenBearer, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({message: "Unauthorized"});
        }
        req.userId = decoded.user_id;
        next();

    });
     };
    const authJwt = {
        verifyToken: verifyToken,
};
module.exports = authJwt;