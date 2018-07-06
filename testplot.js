d3.json("data.json", function(error, root) {
if (error) throw error;

var g = svg.selectAll("g")
    .data(partition.nodes(root))
    .enter().append("g");

path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
    .on("click", magnify)
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
    .each(stash);

var text = g.append("text")
    .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
    .attr("x", function(d) { return y(d.y); })
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .text(function(d) {
        return d.name;
    })
.attr('font-size', function(d) {
    if (d.value < 100000) {
        return '10px'
    } else {
        return '20px';
    }
})
.on("click", magnify);

var innerG = d3.selectAll("g.inner");



// Distort the specified node to 80% of its parent.
function magnify(node) {
    text.transition().attr("opacity", 0);
    spin(node);

    if (parent = node.parent) {
        var parent,
            x = parent.x,
            k = 0.8;
        console.log(x)
        parent.children.forEach(function(sibling) {
            x += reposition(sibling, x, sibling === node
              ? parent.dx * k / node.value
              : parent.dx * (1 - k) / (parent.value - node.value));
        });
    } else {
        reposition(node, 0, node.dx / node.value);
    }

    path.transition()
    .duration(750)
    .attrTween("d", arcTween)
    .each("end", function(e, i) {
      // check if the animated element's data e lies within the visible angle span given in node
        if (e.x >= node.x && e.x < (node.x + node.dx)) {
        // get a selection of the associated text element
            var arcText = d3.select(this.parentNode).select("text");
        // fade in the text element and recalculate positions
            arcText.transition().duration(750)
            .attr("opacity", 1)
            .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
            .attr("x", function(d) {
                return y(d.y);
            });
        }
    });

}

function spin(d) {
    var newAngle = - (d.x + d.dx / 2);

    innerG
      .transition()
        .duration(1500)
        .attr("transform", "rotate(" + ((180 / Math.PI * newAngle) - 90) + ")");

    path
      .classed("selected", function (x) { return d.name == x.name; });
}

// Recursively reposition the node at position x with scale k.
function reposition(node, x, k) {
    // console.log(node)
    node.x = x;
    if (node.children && (n = node.children.length)) {
        var i = -1, n;
        while (++i < n) x += reposition(node.children[i], x, k);
    }
    return node.dx = node.value * k;
}

// Stash the old values for transition.
function stash(d) {
    d.x0 = d.x;
    d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
    var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
    return function(t) {
        var b = i(t);
        a.x0 = b.x;
        a.dx0 = b.dx;
        return arc(b);
    };
};
});
