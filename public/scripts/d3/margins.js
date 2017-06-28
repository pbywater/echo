/* eslint-disable */

var echo = {};

(() => {
  var self = {};

  self.width = 1000;
  self.height = 1000;

  var svg = d3.select("#d3-container")
    .append("svg")
      .attr("width", "100%")
      .classed("d3-background", true)
      .attr("overflow", "visible")
      .attr("height", "100%")
    .append("g")
      .attr("transform", "translate(0,0)");

  echo.margins = self;

})();
