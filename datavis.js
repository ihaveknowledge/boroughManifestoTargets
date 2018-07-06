var root = {
 "name": "borough_manifesto",
 "children": [{
    "name": "Health and Wellbing",
      "children": [{"name": "Physical Activity", "size": 1,
                      "children": [
                          {"name": "Walking", "size": 1},
                          {"name": "Cycling", "size": 1},
                          {"name": "Active Residents", "size": 1}]
                        },
                   {"name": "Healthy Life Expectancy", "size": 1,
                      "children": [
                          {"name": "Male Healthy Life", "size": 1},
                          {"name": "Female Healthy Life", "size": 1}]
                        },
                   {"name": "Wellbeing and Happiness", "size": 1,
                      "children": [
                          {"name": "Life satisfaction", "size": 1},
                          {"name": "Worthiness", "size": 1},
                          {"name": "Happiness", "size": 1},
                          {"name": "Anxiety", "size": 1}]
                        },
                   {"name": "Healthy Weight", "size": 1,
                      "children": [
                          {"name": "Year 6 healthy weight", "size": 1},
                          {"name": "Adult obesity", "size": 1},
                          {"name": "NHS Admissions", "size": 1}]
                        }]},
      {"name": "Employment and Enterprise",
        "children": [{"name": "Unemployment", "size": 1,
                      "children": [
                          {"name": "Unemployment rate", "size": 1},
                          {"name": "Employment rate", "size": 1},
                          {"name": "ESA and JSA", "size": 1}]
                        },
                   {"name": "Growth in Business", "size": 1,
      "children": [
        {"name": "New business survive 5 years", "size": 1},
        {"name": "Job density", "size": 1},
        {"name": "Total job growth", "size": 1}
                                ]},
                   {"name": "Income", "size": 1,
      "children": [
        {"name": "Gross Median annual earnings", "size": 1}
                                ]}]
    }, {
      "name": "Safety",
      "children": [{"name": "Domestic Violence", "size": 1,
      "children": [
      {"name": "Domestic Violence and abuse", "size": 1},
      {"name": "Average number of offenses", "size": 1}
                   ]},
                   {"name": "Antisocial Behaviour", "size": 1,
      "children": [
        {"name": "Police recorded ASB", "size": 1},
        {"name": "Council recorded ASB", "size": 1},
        {"name": "Perceived safety", "size": 1},
        {"name": "Hate Crimes", "size": 1}
                                ]}]
    }, {
      "name": "Skills and Education",
      "children": [{"name": "Educational Attainment", "size": 1,
"children": [
{"name": "Qualifications level 1 and above", "size": 1},
{"name": "Qualifications level 4 and above", "size": 1},
{"name": "Attainment 8 score per pupil", "size": 1}
                   ]}]
    }, {
      "name": "Environment",
      "children": [{"name": "Recycling", "size": 1,
"children": [
{"name": "Waste produced per household", "size": 1},
{"name": "Recycling rates", "size": 1},
{"name": "Perception of 'litter and dirt in streets'", "size": 1}
                   ]}]
    }, {
      "name": "Community Engagement",
      "children": [{"name": "Regular Community Engagement", "size": 1,
"children": [
{"name": "Regularly engage with Everyone Everyday", "size": 1},
{"name": "People volunteering", "size": 1}
                   ]}]
    }, {
      "name": "Housing",
      "children": [{"name": "Build 50,000 new homes", "size": 1,
"children": [
{"name": "Percentage of new homes built againts target", "size": 1},
{"name": "Additional affordable homes", "size": 1},
{"name": "Ratio of house prices to earnings", "size": 1},
{"name": "Median private sector rent", "size": 1},
{"name": "Council housing in decent condition", "size": 1}
                   ]}]
    }]};

  var width = document.getElementById("wheel").offsetWidth,
      height = 700,
      radius = Math.min(width, height) / 2,
      color = d3.scale.category20c();

  var svg = d3.select("#wheel").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width /2 + "," + height / 2 + ")")
    .append("g")
      .classed("inner", true);

  var partition = d3.layout.partition()
      .sort(null)
      .size([2 * Math.PI, radius * radius])
      .value(function(d) { return 1; });

  var arc = d3.svg.arc()
              .startAngle(function(d) { return d.x + Math.PI / 2; })
              .endAngle(function(d) { return d.x + d.dx + Math.PI / 2; })
              .innerRadius(function(d) { return Math.sqrt(d.y); })
              .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });


    var path = svg.datum(root).selectAll("path")
        .data(partition.nodes)
      .enter().append("path")
        .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
        .attr("d", arc)
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .style("fill-rule", "evenodd");



    var textBox = d3.select("svg").selectAll("text")
        .data(["Click on a path"])
      .enter().append("text")
        .attr("transform", "translate(" + width + ",0)")
        .attr("text-anchor", "end")
        .attr("dy", 16)
        .text(String);

    var innerG = d3.selectAll("g.inner");

    d3.selectAll("path").on("click", function (d, i) {
      var newAngle = - (d.x + d.dx / 2);

      innerG
        .transition()
          .duration(1500)
          .attr("transform", "rotate(" + (180 / Math.PI * newAngle) + ")");

      path
        .classed("selected", function (x) { return d.name == x.name; });

      console.log(d.x);

      textBox.data(["Clicked: " + d.name])
          .text(String);
    });


  d3.select(self.frameElement).style("height", height + "px");
