var URL = 'http://localhost:5500'

function getData() {
    //fetch(URL + /get/data/temp)
}

// ------------- BAR CHART ------------- 

const ctx_bar = document.getElementById("chart_bar").getContext('2d');
const myChart_bar = new Chart(ctx_bar, {
    type: 'bar',
    data: {
        labels: ["Today"],
        datasets: [{
            label: 'Temperature',
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgb(47, 128, 237)',
            data: [30],
        },
        {
            label: 'Humidity',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderColor: 'rgb(47, 128, 237)',
            data: [60],
        },
        {
            label: 'Light',
            backgroundColor: 'rgba(255, 206, 86, 1)',
            borderColor: 'rgb(47, 128, 237)',
            data: [200],
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

// ------------- LINE CHART -------------

const ctx_line = document.getElementById("chart_line").getContext('2d');
const myChart_line = new Chart(ctx_line, {
    type: 'line',
    data: {
    labels: ["sunday", "monday", "tuesday",
    "wednesday", "thursday", "friday", "saturday",],
    datasets: [{
        label: 'Temperature',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor:'rgba(255, 99, 132, 1)',
        data: [15, 30, 40, 20, 50, 10, 25],
    },
    {
        label: 'Humidity',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: [20, 100, 30, 50, 70, 40, 10],
    },
    {
        label: 'Light',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(255, 206, 86, 1)',
        data: [200, 500, 300, 100, 400, 200, 100],
    }
    ]
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