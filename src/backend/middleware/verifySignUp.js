const User = require('../model/user')

checkDuplicateEmail = (req, res, next) => {
    const { email } = req.body;
    
    User.findOne({
        email
    })
    .then(user => {
        if (user) {
            return res.send({
              message: "Failed! Email is already in use!"
            });
        }

        next();
    })
    .catch(error => {
        console.log(error);
        res.status(400).json(error);
    })
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
};
  
module.exports = verifySignUp;