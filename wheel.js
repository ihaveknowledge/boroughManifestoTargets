//var svg = d3.select("wheel").append("svg")

var jsonCircles = [
    { "x_axis": 100, "y_axis": 100, "radius": 550, "color" : "purple"},
    { "x_axis": 1000, "y_axis": 300, "radius": 500, "color" : "orange"},
    { "x_axis": 600, "y_axis": 200, "radius": 200, "color" : "green" },
    { "x_axis": 600, "y_axis": 200, "radius": 100, "color" : "red" },
    { "x_axis": 600, "y_axis": 200, "radius": 50, "color" : "white" },
    { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];

var svgContainer = d3.select(".wheelspace").append("svg")
          .attr("width", 1200)
          .attr("height", 400);

var circles = svgContainer.selectAll("circle")
          .data(jsonCircles)
          .enter()
          .append("circle");

var circleAttributes = circles
          .attr("cx", function (d) { return d.x_axis; })
          .attr("cy", function (d) { return d.y_axis; })
          .attr("r", function (d) { return d.radius; })
          .style("fill", function(d) { return d.color; });
