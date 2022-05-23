const { authJwt } = require('../middleware')
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get(
        "/get/dashboard",
        [authJwt.verifyToken],
        controller.userAuth
        )

    app.get(
        "/get/data/temp",
        controller.getDataTemp
        )
    
    app.get(
        "/get/data/humid",
        controller.getDataHumid
    )

    app.get(
        "/get/data/lux",
        controller.getDataLux
        )
}