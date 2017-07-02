/* eslint-disable */

var echo = {};

(() => {
  var self = {};

  self.width = 1000;
  self.height = 1000;

  self.svg = d3.select("#d3-container")
    .append("svg")
      .attr("width", "100%")
      .classed("d3-background", true)
      .attr("overflow", "visible")
      .attr("height", "100%")
    .append("g")
      .attr("transform", "translate(0,0)");

  self.jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/8d852e941cf9c86c98b4b22a269f462e/raw/7b36c7bec844ab5e1644fef2c85fddcaff6dd279/EchoTestData.json'
  echo.margins = self;

})();
