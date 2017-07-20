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

  const jsonUrl = 'https://gist.githubusercontent.com/ConchobarMacNessa/aa31a6d4baa3c9e4d4cb746cd24c5053/raw/b31d88e18cd784b4a25a17642f621a1ce9ad8ca7/testEcho.json'

  const fdGrp = svg
    .append('g');

  const linkGrp = fdGrp
    .append('g')
      .attr('class', 'links');

  const nodeGrp = fdGrp
    .append('g')
      .attr('class', 'nodes');

  const animationDuration = 4500;

module.exports = {
  animationDuration,
  width,
  height,
  svg,
  jsonUrl,
  fdGrp,
  linkGrp,
  nodeGrp
}
