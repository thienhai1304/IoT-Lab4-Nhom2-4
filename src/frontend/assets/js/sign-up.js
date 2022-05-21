var btn_signup = document.getElementById('btn_signup')
var username = document.getElementById('username')
var email = document.getElementById('email')
var password = document.getElementById('password')
var error = document.getElementById('error')

var URL = 'http://localhost:5500'

btn_signup.onclick = (event) => {
    event.preventDefault()
    var data = getInput()

    if (!CheckInput(data)) {
        event.preventDefault()
    }
    else {
        postData(data, event)
    }
}
function postData(data, event) {
    fetch(URL + '/api/auth/signup', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Headers": "X-Requested-With",
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        error.innerHTML= data.message
    })
    .catch(e => {
        console.log(e)
    })
}

function CheckInput(data) {
    if (!(data.email && data.password && data.username)) {
        error.innerHTML= 'All input are required'
        return false
    }
    else if (data.password.length < 9) {
        error.innerHTML= 'The length of password must at least 9'
        return false
    }
    return true
}

function getInput() {
    return {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value,
    }
}