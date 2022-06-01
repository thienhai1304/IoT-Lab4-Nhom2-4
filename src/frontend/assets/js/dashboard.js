const current_time = document.getElementById('current_time')
const current_time_2 = document.getElementById('current_time_2')
const txt_username = document.getElementById('txt_username')

const token = localStorage.getItem("token")
const id_user = localStorage.getItem("id")
console.log(id_user)

var URL = 'http://localhost:5500'
const ws = new WebSocket("ws://localhost:8083");

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

ws.addEventListener("open", () =>{
  console.log("We are connected");
  getUsername()
  ws.send("Hello server 8083, I'm dashboard page!!!");
});
 
ws.addEventListener('close', () => {
    console.log('The connection has been closed !!!');
})

ws.addEventListener('message', function (event) {
    var status = event.data

    if (status == 'active wemos') {
        current_time.style.color = 'green'
    }
    else if (status == 'inactive wemos') {
        current_time.style.color = 'red'
    }
    else if (status == 'active raspberry'){
            current_time_2.style.color = 'green'
    }
    else if (status == 'inactive raspberry') {
        current_time_2.style.color = 'red'
    }

    console.log(status);
}) 