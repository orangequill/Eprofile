$(document).ready(function(){
  var data = [
    {name: 'self', score: 10, color: 'blue'},
    {name: 'peer', score: 7, color: 'yellow'},
    {name: 'educator', score: 9, color: 'red'}
  ];

  var totalSum = 42;

  // set the dimensions and margins of the graph
  var pieWidth = 200;
  var pieHeight = 200;
  // The radius of the pieplot is half the width or half the height (smallest one). 
  var radius = Math.min(pieWidth, pieHeight) / 2;// - margin

  // append the svg object to the div called 'my_dataviz'
  var pieSvg = d3.select("#anxietyScoreChart")
    .append("svg")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
    .append("g")
    .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

  // Create dummy data
  var scores = { educator:9, peer:7, self:10 }
  var labelsOfScores = ["educator", "peer", "self"]

  // set the color scale
  var color = d3.scale.ordinal().range(["red", "orange", "blue"]).domain(scores);

  // Compute the position of each group on the pie:
  var pie = d3.layout.pie().value(function(d) {return d.value; });
  var data_ready = pie(d3.entries(scores));

  var arc = d3.svg.arc().innerRadius(50).outerRadius(radius);
  //arc.text.attr("transform", function(d) {return "translate(" + labelTest +")";});


  // Build the pie chart
  pieSvg.selectAll().data(data_ready)
  .enter().append('path')
  .attr('d', arc).attr('fill', function(d){ return(color(d.data.key))})
  //.attr("transform", function(d){ return(d.data.value)})
  .attr("stroke", "white").style("stroke-width", "2px").style("opacity", 0.7);
});