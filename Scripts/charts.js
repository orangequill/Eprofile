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

        google.visualization.events.addOneTimeListener(chart, 'ready', initEmotion());

        // // Control all other selections by listening to the 'select' event.
        // google.visualization.events.addListener(chart, 'ready', xChange());
        // google.visualization.events.addListener(chart, 'ready', yChange());

        chart.draw(data, options);

        function initEmotion(){
            var x = data.getValue(data.getNumberOfRows() - 1, 0);
            var y = data.getValue(data.getNumberOfRows() - 1, 1);
            chart.draw(data, options);
        };    

        // getting change values
        var dropdownX = document.getElementById("xVal");
        var dropdownY = document.getElementById("yVal");

        // change event
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
        

        // function xChange(){
        //     var x = data.getValue(data.getNumberOfRows() - 1, 0);

        //     // getting change values
        //     var dropdownX = document.getElementById("xVal");

        //      // change event
        //     dropdownX.onchange = function(event){
        //         data.setValue(data.getNumberOfRows() - 1, 0, dropdownX.value);                
        //     }
        //     chart.draw(data, options);
        // };

        // function yChange(){
        //     var y = data.getValue(data.getNumberOfRows() - 1, 1);

        //     // getting change values
        //     var dropdownY = document.getElementById("yVal");

        //     dropdownY.onchange = function(event){
        //         y = dropdownY.value;
        //         data.setValue(data.getNumberOfRows() - 1, 1, y);
               
        //     }
        //     chart.draw(data, options);
        // };

        // function selectEmotion(){
        //     var x = data.getValue(data.getNumberOfRows() - 1, 0);
        //     var y = data.getValue(data.getNumberOfRows() - 1, 1);

        //     // getting change values
        //     var dropdownX = document.getElementById("xVal");
        //     var dropdownY = document.getElementById("yVal");

        //     // change event
        //     dropdownX.onchange = function(event){
        //         x = dropdownX.value;
        //         data.setValue(data.getNumberOfRows() - 1, 0, x);
        //         chart.draw(data, options);
        //     }
        //     dropdownY.onchange = function(event){
        //         y = dropdownY.value;
        //         data.setValue(data.getNumberOfRows() - 1, 1, y);
        //         chart.draw(data, options);
        //     }
        // }; 

    }
});
