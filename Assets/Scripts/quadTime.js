function strToDate(str) {
    var dateSection = str.split("-")
    return new Date(dateSection[2], dateSection[1] - 1, dateSection[0])
}


$(document).ready(function(){
    // d3.csv("./Resources/quadrantData.csv", function(d) {
    //     d.forEach(function(vals) {
    //       date = strToDate(vals.date);
    //       quad = vals.quadrant;
    //       X = +vals.X;
    //       Y = +vals.Y;
    //       Magnitude = +vals.Magnitude;
    //     });
        
    //     var width = 400 - 20 - 20;
    //     var height = 200 - 20 - 20;

    //     var dataXrange = d3.extent(d, function(vals) { return vals.date; });
    //     var dataYrange = [0,d3.max(d, function(vals) { return vals.Magnitude; })];

    //     // axes setup
    //     var xScale = d3.time.scale()
    //     .clamp(true)
    //     .range([10, width - 15])
    //     .domain(dataXrange);

    //     var yScale = d3.scale.linear()
    //     .clamp(true)
    //     .range([height, 0])
    //     .domain(dataYrange);

    //     var xAxis = d3.svg.axis()
    //         .scale(xScale)
    //         .ticks(16)
    //         .tickFormat(d3.time.format("%b %d"))
    //         .tickPadding(-2)
    //         .tickSize(10)
    //         .orient("bottom");

    //     var yAxis = d3.svg.axis()
    //         .scale(yScale)
    //         .orient("left")
    //         .tickSize(10)
    //         .ticks(10);

    //     var svg = d3.select("#emotionalityScoreChart")
    //         .append("svg")
    //         .attr("width", width + 20 + 20)
    //         .attr("height", height + 20 + 20)
    //         .append("g")
    //          .attr("preserveAspectRatio", "xMinYMin meet")
    //          .classed("svg-content", true)
    //         .attr("transform", "translate(" + 40 + "," + 10 + ")");
        
    //     svg.append("g")            
    //         .classed("x axis", true)
    //         .attr("transform", "translate(-10," + height + ")")
    //         .attr("fill", "none")
    //         .attr("stroke", "black")
    //         .attr("stroke-opacity", 1)
    //         .attr("stroke-width", 1)
    //         .call(xAxis);
    
    //     svg.append("g")
    //         .classed("y axis", true)
    //         .attr("fill", "none")
    //         .attr("stroke", "black")
    //         .attr("stroke-opacity", 1)
    //         .attr("stroke-width", 1)
    //         .call(yAxis);

    //     var q1 = $(d).filter(function (i,n){
    //         return n.quadrant==='q1';
    //     });

    //     var q2 = $(d).filter(function (i,n){
    //         return n.quadrant==='q2';
    //     });

    //     var q3 = $(d).filter(function (i,n){
    //         return n.quadrant==='q3';
    //     });

    //     var q4 = $(d).filter(function (i,n){
    //         return n.quadrant==='q4';
    //     });

    //     var quad1Line = d3.svg.line()
    //     .interpolate("basis")
    //     .x(function(q1) { return xScale(q1.date); })
    //     .y(function(q1) { return yScale(q1.Magnitude); });

    //     var quad2Line = d3.svg.line()
    //     .interpolate("basis")    
    //     .x(function(q2) { return xScale(q2.date); })
    //     .y(function(q2) { return yScale(q2.Magnitude); });

    //     var quad3Line = d3.svg.line()
    //     .interpolate("basis")
    //     .x(function(q3) { return xScale(q3.date); })
    //     .y(function(q3) { return yScale(q3.Magnitude); });

    //     var quad4Line = d3.svg.line()
    //     .interpolate("basis")
    //     .x(function(q4) { return xScale(q4.date); })
    //     .y(function(q4) { return yScale(q4.Magnitude); });

    //     svg.append("path")        
    //         .style("stroke", "blue")
    //         .attr("d", quad1Line(q1))
    //         .attr("stroke-width", 2)
    //         .attr("fill", "none");

    //     svg.append("path")        
    //         .style("stroke", "red")
    //         .attr("d", quad2Line(q2))
    //         .attr("stroke-width", 2)
    //         .attr("fill", "none");

    //     svg.append("path")        
    //         .style("stroke", "purple")
    //         .attr("d", quad3Line(q3))
    //         .attr("stroke-width", 2)
    //         .attr("fill", "none");

    //     svg.append("path")        
    //         .style("stroke", "green")
    //         .attr("d", quad4Line(q4))
    //         .attr("stroke-width", 2)
    //         .attr("fill", "none");
            
    // });
    // Me figuring out d3 will need to be a later thing. I definitely still want to, but it keeps giving me NANs, though I can parse the data???
    // But google charts is a solid alternative and a billion times easier. That being said, d3 is still the chosen alternative if this scales.

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Month-Day', 'Q1', 'Q2', 'Q3', 'Q4'],
            ['1-1',0,0,0,1.41],
            ['1-3',0,0,2.23,0],
            ['1-10',0,0,0,3.16],
            ['1-15',0,2.23,0,0],
            ['1-18',2.83,0,0,0],
            ['1-20',0,0,5.0,0],
            ['1-29',5.83,0,0,0],
            ['1-30',0,5.0,0,0],
            ['2-1',0,0,0,2.83],
            ['2-3',0,2.83,0,0],
            ['2-8',7.07,0,0,0],
            ['2-10',0,0,2.83,0],
            ['2-22',0,5.38,0,0],
            ['2-23',0,0,0,5.83],
            ['2-26',5.38,0,0,0],
            ['2-27',0,0,5.38,0]
        ]);

        var options = {
          title: 'Quadrant Magnitude Over Time',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('emotionalityScoreChart'));

        chart.draw(data, options);
    }

  });