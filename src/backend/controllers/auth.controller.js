require('dotenv/config')
const User = require('../model/user')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    
    if (!(email && password && username)) {
        return res.status(400).json({message: "All input is required"});
    }

    User.create({
        username,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 8)
    })
    .then(user => {
        res.json({
            user_id: user._id,
            username: user.username,
            message: "User registered successfully!" });
    })
    .catch(error => {
        console.log(error);
        res.status(400).json(error);
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json({message: "All input is required"});
    }

    User.findOne({
        email
    })
    .then(user => {
        if(!user) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid credentials!"
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );

        if (!(passwordIsValid)) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid credentials!"
            });
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.SECRET_KEY,
            {
              expiresIn: "30m",
            }
        ); 

        user.token = token;

        return res.status(200).json({
            user_id: user._id,
            email,
            token,
            message: "Sign In successfully!" 
        });
    })
    .catch(error => {
        console.log(error);
        res.status(400).json(error);
    })
}