const jwt = require("jsonwebtoken");
const User = require('../model/user')

verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.User = decoded
        console.log(`Decoded JWT: ${decoded}`)
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;