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
        console.log(user)
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
        console.log("error sign in")
        return res.status(400).json({message: "All input is required"});
    }

    User.findOne({
        email
    })
    .then(user => {
        if(!user) {
            console.log("error sign in")

            return res.status(400).send({
                token: null,
                message: "Invalid credentials!"
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        );

        if (!passwordIsValid) {
            console.log("error sign in")

            return res.status(400).send({
                token: null,
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
        console.log(token)

        return res.status(200).send({
            user_id: user._id,
            email,
            token,
            message: "Sign In successfully!" 
        });
    })
    .catch(error => {
        console.log(error);
    })
}