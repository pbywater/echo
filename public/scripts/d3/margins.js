/* eslint-disable */

var width = 1000;
var height = 1000;

var svg = d3.select("#d3-canvas")
  .append("svg")
    // .attr("background-color", "pink")
    .attr("width", "100%")
    .classed("d3-canvas", true)
    .attr("overflow", "visible")
    .attr("height", "100%")
  .append("g")
    .attr("transform", "translate(0,0)")
