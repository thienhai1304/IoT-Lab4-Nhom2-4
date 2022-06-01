
require('dotenv/config')
const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({ port: 8082 })

const mqtt = require("mqtt")
const {BROKER} = process.env
const client = mqtt.connect(BROKER);

const topic_status_led1 = "lab4/nhom24/led/1";
const topic_status_led2 = "lab4/nhom24/led/2";

const topic_controller_led1 = "lab4/nhom24/controller/led/1";
const topic_controller_led2 = "lab4/nhom24/controller/led/2";

// ------ MQTT ------
client.on("connect", () => {
    client.subscribe([topic_status_led1, topic_status_led2]);
});

exports.create = () => {
    wss.on('connection', ws => {
        console.log("New client connected");

        ws.on("close", () => {
            console.log("==> the client has disconnected");
        });
    
        ws.onerror = function () {
            console.log("Some Error occurred !!!")
        }

        client.on("message", (topic, message) => {
            var data = message.toString().split(' ')
            if (topic == topic_status_led1) {
                if (parseInt(data[1]) == 1) {
                    ws.send('led1')
                    console.log(`status 1: ${parseInt(data[1])}`)
                }
            }
            else if (topic == topic_status_led2) {
                if (parseInt(data[1]) == 1) {
                    ws.send('led2')
                    console.log(`status 2: ${parseInt(data[1])}`)
                }
            }
            
        })

        ws.on("message", data => {            
            var dataSplit = data.toString().split(' ')

            var led = dataSplit[0]
            var status = dataSplit[1]

            console.log(`${led}: ${status}`)
            
            if (led == 'led1') {
                client.publish(topic_controller_led1, status)
            }
            else if (led == 'led2') {
                client.publish(topic_controller_led2, status)
            }
        });
    })
}