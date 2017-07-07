const { tagSorting, openTagMenu } = require('../helpers/helpers.js');
const { width, height, jsonUrl, svg } = require('./setup.js');
const { dragstarted, dragged, dragended } = require('./animation.js');
const { sortWithMax, binByTag, tagNodesByTag, memoryNodesAndLinks, generateId } = require('../node_transformations');
const { appendPopUp, randomPopUp } = require('./modals');

const url = location.hostname ? '/memories' : jsonUrl;

d3.json(url, (err, data) => {
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
  // Add unique tags to tag list for user to select from
  Object.keys(taggedNodesByTag).forEach((tag) => {
    tag = tag.replace(/\W/g, '');
    $('.tags').append(
      `<li class='tag-container ${tag}'>
        <p class='tagLabel'>${tag}</p>
        <img class='filter-tags ${tag}' src="./assets/icons/navigate/close_icon.svg"/>
      </li>`);
  });
  $('.tags').append(
    `<li class='clear-tags'>clear</li>
    <li class='close-tags'>
      <img class='close-icon' src="./assets/icons/navigate/close_icon.svg">
      </img>
    </li>`);
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
    .attr('id', d => d.id)
    .attr('class', 'memoryG');

  circles
    .append('circle')
    .attr('cy', d => d.y)
    .attr('cx', d => d.x)
    .attr('class', d => `memory ${d.tag}`)
    .attr('r', d => rScale(d.likes))
    .on('click', function(d){
        appendPopUp(d)
    })
    .style('fill', 'white')
    .style('opacity', '0.8')
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
    .attr('class', d => `memory ${processedData.nodes[d.source].tag}`)
    .style('stroke-width', '2px')
    .style('opacity', '0.8');

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

  d3
    .selectAll('.shuffle-memories')
      .on('click', function(){
        randomPopUp(nodeDataArray)
      })

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.select(this).raise().classed('active', true);
  }

  function dragged(d) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget();
    d3.select(this).classed('active', false);
  }

  openTagMenu();
});
