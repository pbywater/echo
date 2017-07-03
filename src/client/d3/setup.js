/* eslint-disable */

  const width = 1000;
  const height = 1000;

  const svg = d3.select("#d3-container")
    .append("svg")
      .attr("width", "100%")
      .classed("d3-background", true)
      .attr("overflow", "visible")
      .attr("height", "100%")
    .append("g")
      .attr("transform", "translate(0,0)");

  const jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/8d852e941cf9c86c98b4b22a269f462e/raw/7b36c7bec844ab5e1644fef2c85fddcaff6dd279/EchoTestData.json'

module.exports = {
  width,
  height,
  svg,
  jsonUrl
}
