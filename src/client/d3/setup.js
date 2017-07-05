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

  const jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/aa31a6d4baa3c9e4d4cb746cd24c5053/raw/60b631c0736e98cce1a8723f95401e65b949a11d/testEcho.json'

module.exports = {
  width,
  height,
  svg,
  jsonUrl
}
