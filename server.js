require('dotenv/config')
require('./src/backend/config/database').connect()

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");

const {API_PORT} = process.env
const port = API_PORT || 5500

//only URL below can make request to server
var corsOptions = {
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"]
}

app.use(cors(corsOptions));

app.use(express.json())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require('./src/backend/routes/auth')(app)
require('./src/backend/routes/user')(app)

app.get('/signup', (req, res) => {
    res.status(200).sendFile('D:/Lab4/src/frontend/pages/sign-up.html');
})

// Server Listening
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
