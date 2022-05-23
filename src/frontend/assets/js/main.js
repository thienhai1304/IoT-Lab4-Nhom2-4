var temp_txt = document.getElementById('temp_txt')
var humid_txt = document.getElementById('humid_txt')
var lux_txt = document.getElementById('lux_txt')

var URL = 'http://localhost:5500'

setInterval(getDataTemp, 1000)
setInterval(getDataHumid, 850)
setInterval(getDataLux, 800)

function getDataTemp() {
    fetch(URL + '/get/data/temp', {
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json',
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        temp_txt.innerHTML = `${data.value}°C`
    })
    .catch(e => {
        console.log(e)
    })
}

function getDataHumid() {
    fetch(URL + '/get/data/humid', {
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json',
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        humid_txt.innerHTML = `${data.value}%`
    })
    .catch(e => {
        console.log(e)
    })
}

function getDataLux() {
    fetch(URL + '/get/data/lux', {
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json',
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        lux_txt.innerHTML = `${data.value}lux`
    })
    .catch(e => {
        console.log(e)
    })
}