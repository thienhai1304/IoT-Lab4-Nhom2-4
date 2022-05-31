require('dotenv/config')
require('./src/backend/config/database').connect()
require('./src/backend/websocket/socket_8080').create()
require('./src/backend/websocket/socket_8081').create()
require('./src/backend/websocket/socket_8082').create()

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const mqtt = require("mqtt");
const Device = require('./src/backend/model/device')

const {API_PORT} = process.env
const port = API_PORT || 5500
const {BROKER} = process.env
const client = mqtt.connect(BROKER);

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

// Routes
require('./src/backend/routes/auth')(app)
require('./src/backend/routes/user')(app)

// MQTT
client.on("connect", () => {
    const topic_temp = "lab4/nhom24/dht/temp";
    const topic_humid = "lab4/nhom24/dht/humid";
    const topic_bh1750 = "lab4/nhom24/bh1750/lux";
    const topic_led1 = "lab4/nhom24/led/1";
    const topic_led2 = "lab4/nhom24/led/2";
    const topic_raspberry = "lab4/nhom24/raspberry/broker";

    client.subscribe([topic_temp, topic_humid , topic_bh1750, topic_led1, topic_led2, topic_raspberry]);
});

client.on("message", (topic, message) => {
    // IP : data[0] , value : data[1]
    var data = message.toString().split(' ')

    var topicSplit = topic.toString().split('/')
    var device = topicSplit[topicSplit.length - 2]
    var type = topicSplit[topicSplit.length - 1]
    var board;

    console.log(
    `device: ${device}\n type: ${type}\n message: ${data[1]}\n IP: ${data[0]}`)

    if (device == 'raspberry') {
        board = 'Raspberry Pi'
    }

    if (typeof data[1] == 'string') {
        data[1] = parseInt(data[1])
    }
    
    InsertData(device, data[1], data[0], type, board)    
});

// Server Listening
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

// Insert data
function InsertData(device, value, IP, type, board = 'Wemos D1') {
    Device.create({
        device: device,
        IPaddress: IP,
        value: value,
        type: type,
        time: new Date(),
        board: board
    })
    .then(() => {
        var now = new Date();
        console.log(` ${now} ${now.getHours()}:${now.getMinutes()}`)
        console.log('=> inserted to DB')
    })
    .catch(e => {
        console.log('fail to insert: ' + e)
    })
}