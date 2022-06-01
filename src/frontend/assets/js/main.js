var temp_txt = document.getElementById('temp_txt')
var humid_txt = document.getElementById('humid_txt')
var lux_txt = document.getElementById('lux_txt')

var toggle_led_1 = document.getElementById('myToggle')
var toggle_led_2 = document.getElementById('myToggle2')

const txt_username = document.getElementById('txt_username')

const ws = new WebSocket("ws://localhost:8080");
const ws_2 = new WebSocket("ws://localhost:8082");

const token = localStorage.getItem("token")
const id_user = localStorage.getItem("id")
console.log(id_user)

var URL = 'http://localhost:5500'

// ----- Username -----
getUsername()

function getUsername() {
    fetch(URL + '/api/post/name', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id_user}),
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
        txt_username.innerHTML = data.username
    })
    .catch(e => {
        console.log(e)
    })
}

// ----- Websocket -----
ws.addEventListener("open", () =>{
    console.log("We are connected 8080");
    ws.send("Hello server 8080, I'm main page !!!");
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

// ------ 8082 ------

ws_2.addEventListener("open", () =>{
    console.log("We are connected 8082");
    ws_2.send("Hello server 8082, I'm main page !!!");
});
   
ws_2.addEventListener('close', () => {
    console.log('The connection has been closed !!!');
})

ws.addEventListener('message', function (event) {
    var status = event.data
    if (status == 'led1') {
        toggle_led_1.checked = true
    }
    else if (status == 'led2') {
        toggle_led_2.checked = true
    }
})

// ------ Button ------
toggle_led_1.onclick = () => {
    if (toggle_led_1.checked)
        ws_2.send("led1 on")
    else {
        ws_2.send("led1 off")
    }
}
toggle_led_2.onclick = () => {
    if (toggle_led_2.checked)
        ws_2.send("led2 on")
    else {
        ws_2.send("led2 off")
    }
}