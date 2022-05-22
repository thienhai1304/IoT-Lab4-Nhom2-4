var btn_signin = document.getElementById('btn_signin')
var email = document.getElementById('email')
var password = document.getElementById('password')
var btn_gotodb = document.getElementById('btn_gotodb')
var error = document.getElementById('error')

var URL = 'http://localhost:5500'
var token = localStorage.getItem("token")

if (token) {
    postToken(token)
}

btn_signin.onclick = (event) => {
    event.preventDefault()
    var data = getInput()

    if (!checkInput(data)) {
        event.preventDefault()
    }
    else {
        postDataSignIn(data)
    }
}

function postToken(token) {
    fetch(URL + '/get/dashboard', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    })
    .then(res => {
        if (res.ok) {
            window.open('./dashboard.html', '_top')
        }
        else {
            localStorage.clear()
        }
    })
    .catch(e => {
        console.log(e)
    })
}

function postDataSignIn(data) {
    fetch(URL + '/api/auth/signin', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        if(res.clone().ok) {
            error.style.display = 'none'
            btn_gotodb.style.display = "inline-block"
            return res.json()
        }
        else {
            return res.json()
        }
    })
    .then(data => {
        if(data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.user_id);
            console.log(localStorage.getItem("token"))
        }
        else {
            error.innerHTML= data.message
        }
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