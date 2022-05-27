var temp_txt = document.getElementById('temp_txt')
var humid_txt = document.getElementById('humid_txt')
var lux_txt = document.getElementById('lux_txt')
const ws = new WebSocket("ws://localhost:8080");

var URL = 'http://localhost:5500'

ws.addEventListener("open", () =>{
    console.log("We are connected");
    ws.send("Hello server !!!");
  });
   
ws.addEventListener('close', () => {
    console.log('The connection has been closed !!!');
})

ws.addEventListener('message', function (event) {
    var data = event.data.split(',')
    if (parseInt(data[0])) {
        temp_txt.innerHTML = parseInt(data[0])
        humid_txt.innerHTML = parseInt(data[1])
        lux_txt.innerHTML = parseInt(data[2])
    }
})