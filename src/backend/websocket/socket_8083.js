const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({ port: 8083 })
const Device = require('../model/device')
const mqtt = require('mqtt')

const {BROKER} = process.env
const client = mqtt.connect(BROKER);

var currentTime, intervalID

exports.create = () => {
    wss.on("connection", ws => {
        console.log("New client connected");
        
        // sending message
        ws.on("message", data => {
            console.log(`${data.toString()}`)
        });

        ws.on("close", () => {
            console.log("==> the client has disconnected");
        });
    
        ws.onerror = function () {
            console.log("Some Error occurred !!!")
        }
        
        client.on("connect", () => {
            ws.send('active raspberry') 
            intervalID = setInterval(() => {
                checkTime(ws)
            }, 6000)
        });

        client.on('message', () => {
            ws.send('active wemos')
        })

        client.on("close", () => {
            ws.send('inactive wemos')
            ws.send('inactive raspberry')
            
            clearInterval(intervalID)
            client.end()
            client.reconnect()  
        });
    })
}

function checkTime(ws) {
    Device.findOne({}).sort({time: '-1'})
    .then(data => {
        currentTime = new Date()
        
        var timeDiff = Math.abs(currentTime.getTime() - data.time.getTime());
        var diffSec = Math.ceil(timeDiff / 1000);
        console.log(diffSec)
        
        if (diffSec > 6) {
            ws.send('inactive wemos')
        }
        else {
            ws.send('active wemos')
        }
    })
    .catch(e => {
        console.log(e)
    })
}

