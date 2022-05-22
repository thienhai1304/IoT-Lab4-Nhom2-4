const jwt = require("jsonwebtoken");
const User = require('../model/user')

verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
  
    if (!token) {
        console.log('token lost')
        return res.status(403).send({
            message: "No token provided!"
        });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('token lost')
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.User = decoded
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;