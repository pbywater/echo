const { width, height, jsonUrl, svg } = require('./setup.js');
const { dragstarted, dragged, dragended } = require('./animation.js');
const { sortWithMax, binByTag, tagNodesByTag, memoryNodesAndLinks, generateId } = require('../node_transformations');


d3.json(jsonUrl, (err, data) => {
  // binByTag sorts data by tag
  // e.g. {family: Array(5), pets: Array(5), friends: Array(5)}
  const binnedByTag = binByTag(data);
  // sortedWithMax sorts each tag group to separate max memory (by avgRating) from others in its group
  const sortedWithMax = [];
  Object.keys(binnedByTag).forEach((tagKey) => {
    sortedWithMax.push(sortWithMax(binnedByTag[tagKey]));
  });
  // taggedNodesByTag returns an object with the cx and cy for the central node within each tag group
  const taggedNodesByTag = tagNodesByTag(sortedWithMax, 160, 120, generateId());
  // processedData returns a list of nodes and links
  const processedData = memoryNodesAndLinks(taggedNodesByTag, sortedWithMax);

  const nodeDataArray = [];
  Object.keys(processedData.nodes).forEach((key) => {
    nodeDataArray.push(processedData.nodes[key]);
  });

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked)
    .stop();

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(nodeDataArray, d => d.likes)])
    .range([0, 10]);

  const circles = svg
    .selectAll('.memory')
    .data(nodeDataArray)
    .enter()
    .append('g')
    .attr('id', (d) => {
      d.id;
    })
    .attr('class', 'memoryG');

  circles
    .append('circle')
    .attr('cy', d => d.y)
    .attr('cx', d => d.x)
    .attr('class', 'memory')
    .attr('r', d => rScale(d.likes))

    .style('fill', 'white')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

  const link = svg
    .selectAll('line')
    .data(processedData.links)
    .enter()
    .append('line');

  link
    .attr('x2', d => processedData.nodes[d.target].x,
    )
    .attr('y2', d => processedData.nodes[d.target].y,
    )
    .attr('x1', d => processedData.nodes[d.source].x,
    )
    .attr('y1', d => processedData.nodes[d.source].y,
    )
    .style('stroke', 'white')
    .style('stroke-width', '3px');

  simulation.nodes(circles);
  simulation.force('link').links(link);
  simulation.restart();

  function ticked() {
    link
      .attr('x1', d => processedData.nodes[d.source].x)
      .attr('y1', d => processedData.nodes[d.source].y)
      .attr('x2', d => processedData.nodes[d.target].x)
      .attr('y2', d => processedData.nodes[d.target].y);
    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  const memories = svg
    .selectAll('.memory');
});
