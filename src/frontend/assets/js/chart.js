var URL = 'http://localhost:5500'

const ctx_bar = document.getElementById("chart_bar").getContext('2d');
const ctx_line = document.getElementById("chart_line").getContext('2d');
const ctx_pie = document.getElementById("chart_pie").getContext('2d');

var myChart_bar 
var myChart_line
var myChart_pie

var dataTemp
var dataHumid
var dataLight
var labelTimeline

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
        dataTemp = data.value
    })
    .then(() => {
        return getDataHumid()
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
        dataHumid = data.value
    })
    .then(() => {
        return getDataLux()
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
        dataLight = data.value
    })
    .catch(e => {
        console.log(e)
    })
}

function getTotalData() {
    getDataTemp()
    getDataHumid()
    getDataLux()
}

// ------------- BAR CHART ------------- 

// First draw
drawChartBar()

// Update chart
setInterval(updateChartBar, 1000)

function updateChartBar() {
    var date = new Date()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    
    labelTimeline = `${hour}:${minute}:${second}`

    getTotalData()
    addDataBar(myChart_bar, labelTimeline)
}

function addDataBar(chart, label) {
    chart.data.labels[0] = label;
    //console.log(`${dataTemp} ${dataHumid} ${dataLight}`)
    chart.data.datasets[0].data[0] = dataTemp
    chart.data.datasets[1].data[0] = dataHumid
    chart.data.datasets[2].data[0] = dataLight
    chart.update();
}

function drawChartBar() {
    myChart_bar = new Chart(ctx_bar, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgb(47, 128, 237)',
                data: [],
            },
            {
                label: 'Humidity',
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgb(47, 128, 237)',
                data: [],
            },
            {
                label: 'Light',
                backgroundColor: 'rgba(255, 206, 86, 1)',
                borderColor: 'rgb(47, 128, 237)',
                data: [],
            }]
        },
        options: {
            scales: {
            yAxes: [{
                ticks: {
                beginAtZero: true,
                }
            }]
            }
        },
    });
}

// ------------- LINE CHART -------------

// First draw
drawChartLine()

// Update chart
setInterval(updateChartLine, 1000)
function updateChartLine() {
    addDataLine(myChart_line, labelTimeline)

    if (myChart_line.data.labels.length > 10) {
        removeData(myChart_line)
    }
}

function addDataLine(chart, label) {
    chart.data.labels.push(label);
    //console.log(`${dataTemp} ${dataHumid} ${dataLight}`)
    chart.data.datasets[0].data.push(dataTemp)
    chart.data.datasets[1].data.push(dataHumid)
    chart.data.datasets[2].data.push(dataLight)
    chart.update();
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}

function drawChartLine() {
    myChart_line = new Chart(ctx_line, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor:'rgba(255, 99, 132, 1)',
                data: [],
            },
            {
                label: 'Humidity',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(54, 162, 235, 1)',
                data: [],
            },
            {
                label: 'Light',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(255, 206, 86, 1)',
                data: [],
            }
            ]
        },
        options: {
        scales: {
            yAxes: [{
            ticks: {
                beginAtZero: false,
            }
            }]
        }
        },
    });
}

// ------------- PIE CHART -------------
// First draw
drawChartPie()

const myChart_pie = new Chart(ctx_pie, {
    type: 'pie',
    data: {
        labels: ["Temperature", "Humidity", "Light"],
        datasets: [{
            backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderColor: 'rgb(47, 128, 237)',
            data: [100, 200, 360],
        }]
    },
});
=======
// Update chart
setInterval(updateChartPie, 1000)

function updateChartPie() {
    addDataPie(myChart_pie)

}

function addDataPie(chart) {
    console.log(`${dataTemp} ${dataHumid} ${dataLight}`)
    chart.data.datasets[0].data[0] = dataTemp
    chart.data.datasets[0].data[1] = dataHumid
    chart.data.datasets[0].data[2] = dataLight
    chart.update();
}

function drawChartPie() {
    myChart_pie = new Chart(ctx_pie, {
        type: 'pie',
        data: {
            labels: ["Temperature", "Humidity", "Light"],
            datasets: [{
                backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderColor: 'rgb(47, 128, 237)',
                data: [],
            }],
        },
        });
}
