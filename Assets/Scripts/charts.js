$(document).ready(function(){

    /* The chart js code was based off of a random walk chart. I borrowed the library because it was the best one I had found. 
       Source attribution: https://developers.google.com/chart/interactive/docs/gallery/scatterchart#fullhtml
    */
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('number');
        data.addColumn('number');

        // Central point
        data.addRow([0, 0]);

        var options = {
        legend: 'none',
        colors: ['black'],
        hAxis: { minValue: -5, maxValue: 5},
        vAxis: { minValue: -5, maxValue: 5},
        pointShape: 'circle',
        pointSize: 15
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('selectEmotionChart'));

        google.visualization.events.addOneTimeListener(chart, 'ready', initEmotion);

        chart.draw(data, options);

        function initEmotion(){
            var x = data.getValue(data.getNumberOfRows() - 1, 0);
            var y = data.getValue(data.getNumberOfRows() - 1, 1);
            chart.draw(data, options);
        };    

        // getting change values
        var dropdownX = document.getElementById("xVal");
        var dropdownY = document.getElementById("yVal");

        // change events for x and y selections below
        dropdownX.onchange = function(event){
            var x = data.getValue(data.getNumberOfRows() - 1, 0);
            x = dropdownX.value;
            data.setValue(data.getNumberOfRows() - 1, 0, x);      
            chart.draw(data, options);          
        }

        dropdownY.onchange = function(event){
            var y = data.getValue(data.getNumberOfRows() - 1, 1);
            y = dropdownY.value;
            data.setValue(data.getNumberOfRows() - 1, 1, y);
            chart.draw(data, options);
        }
    }

});

var getQuadrant = function(x,y){
    if(x >= 0 && y >= 0){
        return "q1";
    } else if(x >= 0 && y < 0){
        return "q2";
    } else if(x < 0 && y < 0){
        return "q3";
    } else{
        return "q4";
    }
}

function dataWrite(){
    // getting change values
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var dropdownX = document.getElementById("xVal");
    var dropdownY = document.getElementById("yVal");
    var desc = document.getElementById("EmoDesc");

    var dateVal = ""+ month + "-" + day + "-" + year;
    var Magnitude = Math.sqrt(Math.pow(dropdownX.value, 2) + Math.pow(dropdownY.value, 2));

    var quad = getQuadrant(dropdownX.value, dropdownY.value)

    var jsonData = {
        "num": 1,
        "date" : dateVal,
        "x" : dropdownX.value,
        "y" : dropdownY.value,
        "quadrant": quad,
        "Magnitude" : Magnitude,
        "Emotion" : desc.value
    };

    // I learned that you can't write to a file using js, but you can locally store it
    // with that, I am basing the following code on the create element example found here
    // https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(jsonData)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "quadData.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
} 
