var btn_signin = document.getElementById('btn_signin')
var email = document.getElementById('email')
var password = document.getElementById('password')
var btn_gotodb = document.getElementById('btn_gotodb')
var error = document.getElementById('error')

var URL = 'http://localhost:5500'

btn_signin.onclick = (event) => {
    event.preventDefault()
    var data = getInput()

    if (!checkInput(data)) {
        event.preventDefault()
    }
    else {
        postData(data)
    }
}

function postData(data) {
    fetch(URL + '/api/auth/signin', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Headers": "X-Requested-With",
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if(res.clone().ok) {
            btn_gotodb.style.display = "inline-block"
        }
        if(res.clone().status == 400)
            return res.json()
    })
    .then(data => {
        error.innerHTML= data.message
    })
    .catch(e => {
        console.log(e)
    })
}

function checkInput(data) {
    if (!(data.email && data.password)) {
        error.innerHTML= 'All input are required'
        return false
    }
    return true
}

function getInput() {
    return {
        email: email.value.trim(),
        password: password.value,
    }
}