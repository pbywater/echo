/* eslint-disable */

// (function createSVG(){
  var width = 1000;
  var height = 1000;

  var svg = d3.select("#d3-container")
    .append("svg")
      .attr("width", "100%")
      .classed("d3-background", true)
      .attr("overflow", "visible")
      .attr("height", "100%")
    .append("g")
      .attr("transform", "translate(0,0)");

  var jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/8d852e941cf9c86c98b4b22a269f462e/raw/b6769ade5d9c06ed5c5e5c6e1dee3b0f85b597b6/EchoTestData.json'
// })()
