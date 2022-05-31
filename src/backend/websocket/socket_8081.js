const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({ port: 8081 })
const Device = require('../model/device')

var log

exports.create = () => {
    wss.on("connection", ws => {
        console.log("New client connected");
        
        // sending message
        ws.on("message", data => {
            console.log(`${data.toString()}`)
            if (data.toString() == 'Insert') {
                wss.clients.forEach(client => {
                    if (client !== ws && client.readyState === ws.OPEN) {
                        getLog(client)
                    }
                });
            }
        });
    
        ws.on("close", () => {
            console.log("==> the client has disconnected");
        });
    
        // handling client connection error
        ws.onerror = function () {
            console.log("Some Error occurred !!!")
        }
    });
}

function getLog(client) {
    Device.find({},{__v: 0}).sort({time: -1}).limit(3)
    .then(data => {
        data.forEach(current => {
            time = `${current.time.getDate()}/${current.time.getMonth()}/${current.time.getYear()} ${current.time.getHours()}:${current.time.getMinutes()}:${current.time.getSeconds()}`
            log = 
            `<tr>
                <td>${current._id}</td>
                <td>${current.IPaddress}</td>
                <td>${current.board}</td>
                <td>${current.device}</td>
                <td>${current.value}</td>
                <td>${time}</td>
            </tr>
            `

            client.send(log);
        })
    })
    .catch(e => {
        console.log(e)
    })
}