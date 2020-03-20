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

        // Control all other animations by listening to the 'animationfinish' event.
        google.visualization.events.addListener(chart, 'animationfinish', selectEmotion(1,1));

        chart.draw(data, options);

        function initEmotion(){
        var x = data.getValue(data.getNumberOfRows() - 1, 0);
        var y = data.getValue(data.getNumberOfRows() - 1, 1);
        chart.draw(data, options);
        };    

        function selectEmotion(xVal = 0,yVal= 0){
        var x = data.getValue(data.getNumberOfRows() - 1, 0);
        var y = data.getValue(data.getNumberOfRows() - 1, 1);
        if (xVal != 0){
            x = xVal;
        }
        if (yVal != 0){
            y = yVal;
        }        
        chart.draw(data, options);
        }; 
    }
});