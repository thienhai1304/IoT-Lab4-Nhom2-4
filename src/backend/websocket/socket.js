const WebSocketServer = require('ws')
const wss = new WebSocketServer.Server({ port: 8080 })
const Device = require('../model/device')

var dataTemp, dataHumid, dataLight

exports.create = () => {
    wss.on("connection", ws => {
        console.log("New client connected");

        setInterval(getData, 1000)
        setInterval(() => {
            ws.send(`${[dataTemp, dataHumid, dataLight]}`);
        }, 1000)
        
        // sending message
        ws.on("message", data => {
            console.log(`Client has sent us: ${data}`)
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

function getData() {
    getTemp()
    getHumid()
    getLight()
}

function getTemp() {
    Device.findOne(
        {type: 'temp'},
        {value: 1, _id: 0}).sort({time: '-1'})
    .then(data => {
        dataTemp = data.value
        console.log(`temp: ${dataTemp}`)
    })
    .catch(e => {
        console.log(e)
    })
}

function getHumid() {
    Device.findOne(
        {type: 'humid'},
        {value: 1, _id: 0}).sort({time: '-1'})
    .then(data => {
        dataHumid = data.value
        console.log(`humid: ${dataHumid}`)
    })
    .catch(e => {
        console.log(e)
    })
}

function getLight() {
    Device.findOne(
        {type: 'lux'},
        {value: 1, _id: 0}).sort({time: '-1'})
    .then(data => {
        dataLight = data.value
        console.log(`light: ${dataLight}`)
    })
    .catch(e => {
        console.log(e)
    })
}