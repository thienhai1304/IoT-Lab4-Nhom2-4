require('dotenv/config')
require('./src/backend/config/database').connect()
require('./src/backend/websocket/socket').create()

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const mqtt = require("mqtt");
const Device = require('./src/backend/model/device')

const {API_PORT} = process.env
const port = API_PORT || 5500
const broker = "mqtt://broker.hivemq.com:1883"
const client = mqtt.connect(broker);

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

    client.subscribe([topic_temp, topic_humid , topic_bh1750, topic_led1, topic_led2]);
});

client.on("message", (topic, message) => {
    var value = message.toString()
    var topicSplit = topic.toString().split('/')
    var device = topicSplit[topicSplit.length - 2]
    var type = topicSplit[topicSplit.length - 1]

    console.log(
    `device: ${device}\n type: ${type}\n message: ${value}`)

    InsertData(device, value, type)    
});

// Server Listening
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

// Insert data
function InsertData(device, value, type, board = 'wemos') {
    Device.create({
        device: device,
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

