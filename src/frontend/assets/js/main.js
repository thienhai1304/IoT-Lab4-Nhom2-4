var URL = 'http://localhost:5500'

function getDataTemp() {
    fetch(URL + '/get/data/temp', {
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json',
    })
    .then(res => {
        
    })
}