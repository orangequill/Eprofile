$(document).ready(function(){
  var treeData = [
    {
      "name": "User Profile", "parent": "null",
      "children": [
        {
          "name": "Learning Style", "parent": "User Profile",
          "children": [
            {
              "name": "Style A","parent": "Learning Style"
            },
            {
              "name": "Style B","parent": "Learning Style"
            },
            {
              "name": "Style C","parent": "Learning Style"
            },
            {
              "name": "Style D","parent": "Learning Style"
            }
          ]
        },
        {
          "name": "Emotionality","parent": "User Profile",
          "children": [
            {
              "name": "Anxiety Score","parent": "Emotionality"
            }, 
            {
              "name": "Emotionality Score","parent": "Emotionality"
            }
          ]
        }
      ]
    }
  ]
  
  // based on Mike Bostock's collapsable tree found https://observablehq.com/@d3/collapsible-tree
  // and based on https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd 
  // and based on https://bl.ocks.org/mbostock/1095795/8f34afdd6d321b71ca6b3a5904e486f3173f1111
  // ************** Generate the tree diagram	 *****************
  var width = 960, height = 300;

  var i = 0;
  var duration = 500;
  var root = treeData[0];
  var tree = d3.layout.tree().size([height, width]);
  // flips tree horizontally
  var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("#LearningProfileChart")
  .append("svg")
  .attr("width", width).attr("height", height)
  .append("g").attr("transform", "translate(400,20)");

  update(root);

  function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root);
    var links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 200;});

    // Update the nodes…
    var node = svg.selectAll(".node").data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .on("click", click);

    nodeEnter.append("circle").attr("r", 10).style("fill", "palevioletred");
    nodeEnter.append("text").attr("y", -19).attr("x", 15).attr("text-anchor", "middle")
      .text(function(d) { return d.name; }).style("fill-opacity", 1);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition().duration(duration).attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
    nodeUpdate.select("circle").attr("r", 10).style("fill", function(d) { return d._children ? "gray" : "palevioletred"; });

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; }).remove();
    nodeExit.select("circle").attr("r", 10).remove();
    nodeExit.select("text").style("fill-opacity", 1).remove();

    // Update the links…
    var link = svg.selectAll("path.link").data(links);

    // Enter any new links at the parent's previous position.
    link.enter().append("path").attr("class", "link").attr("d", diagonal)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 1.5);

    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition().duration(duration).attr("d", diagonal).remove();
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }


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