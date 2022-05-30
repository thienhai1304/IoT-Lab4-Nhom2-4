const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({ port: 8081 })
const Device = require('../model/device')

var log

exports.create = () => {
    wss.on("connection", ws => {
        console.log("New client connected");
        
        // sending message
        ws.on("message", data => {
            console.log(`Wemos insert data`)
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === ws.OPEN) {

                    client.send(log);
                }
            });
        });
    
        // handling what to do when clients disconnects from server
        ws.on("close", () => {
            console.log("==> the client has disconnected");
        });
    
        // handling client connection error
        ws.onerror = function () {
            console.log("Some Error occurred !!!")
        }
    });
}

function getLog() {
    Device.findOne({__v: 0}).sort({time: -1})
    .then(data => {
        log = data
        console.log(log)
    })
    .catch(e => {
        console.log(e)
    })
}