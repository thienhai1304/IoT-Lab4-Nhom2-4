const ws = new WebSocket("ws://localhost:8081")
const logs = document.getElementById('logs')
const btn_export = document.getElementById('btn_export')

var listLogs = []
ws.addEventListener("open", () =>{
    console.log("We are connected");
    ws.send("Hello server 8081, I'm log page!!!");
  });
   
ws.addEventListener('close', () => {
    console.log('The connection has been closed !!!');
})

ws.addEventListener('message', function (event) {
    console.log(event.data)
    listLogs.unshift(event.data)
    console.log(listLogs.join(''))
    logs.innerHTML = listLogs.join('')
})

// ----- Export ------

btn_export.onclick = () => {
    tableToCSV()
}

function tableToCSV() {
    var csv_data = [];

    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        var cols = rows[i].querySelectorAll('td,th');

        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            csvrow.push(cols[j].innerHTML);
        }

        csv_data.push(csvrow.join(","));
    }

    csv_data = csv_data.join('\n');

    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

    // Tao CSV file object và truyen du lieu vao
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });
    // Tạo link tạm thời để down
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "log_data.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // An kh de link xuat hien
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Tu dong click de download
    temp_link.click();
    document.body.removeChild(temp_link);
}