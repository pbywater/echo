const { tagSorting, openTagMenu, submitNewMemory } = require('../helpers/helpers.js');
const { width, height, jsonUrl, svg } = require('./setup.js');
const { dragstarted, dragged, dragended } = require('./animation.js');
const { sortWithMax, binByTag, centralMaxNodesByTag, memoryNodesAndLinks } = require('../node_transformations');
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
  const centralNodesByTag = centralMaxNodesByTag(sortedWithMax, 160, 120);

  // Add unique tags to tag list for user to select from
  Object.keys(centralNodesByTag).forEach((tag) => {
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
  const processedData = memoryNodesAndLinks(centralNodesByTag, sortedWithMax);

  const nodeDataArray = [];
  Object.keys(processedData.nodes).forEach((key) => {
    nodeDataArray.push(processedData.nodes[key]);
  });
  const rScale = d3
  .scaleSqrt()
  .domain([0, d3.max(nodeDataArray, d => d.likes)])
  .range([3, 8]);

  const fdGrp = svg
    .append('g');

  const linkGrp = fdGrp
    .append('g')
    .attr('class', 'links');

  const links = linkGrp
    .selectAll('line.link')
    .data(processedData.links)
    .enter()
    .append('line')
      .attr('x2', d => processedData.nodes[d.target].x,
      )
      .attr('y2', d => processedData.nodes[d.target].y,
      )
      .attr('x1', d => processedData.nodes[d.source].x,
      )
      .attr('y1', d => processedData.nodes[d.source].y,
      )
      .style('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', '0.8')
      .attr('class', d => `memory ${processedData.nodes[d.source].tag}`);

  const nodeGrp = fdGrp
    .append('g')
      .attr('class', 'nodes');

  const nodes = nodeGrp
    .selectAll('circle.node')
    .data(nodeDataArray)
    .enter()
    .append('circle')
      .attr('class', d => `memory ${d.tag}`)
      .attr('cy', d => d.y)
      .attr('cx', d => d.x)
      .attr('r', d => rScale(d.likes))
      .style('fill', 'white')
      .style('opacity', '0.8')
      .on('click', (d) => {
        appendPopUp(d);
      })
      .call(d3.drag()
        .on('start', dragstart)
        .on('drag', dragging)
        .on('end', dragend));

  const sim = d3.forceSimulation()
    .force('link', d3.forceLink(processedData).id(d => d.id))
    .force('forceX', d3.forceX().strength(0.5).x(d => d.x))
    .force('forceY', d3.forceY().strength(0.5).y(d => d.y))
    .force('center', d3.forceCenter(180, 320))
    .stop();

  sim
  .nodes(nodeDataArray)
  .on('tick', () => {
    nodes
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
    links
      .attr('x1', d =>
      processedData.nodes[d.source.id].x)
      .attr('y1', d => processedData.nodes[d.source.id].y)
      .attr('x2', d => processedData.nodes[d.target.id].x)
      .attr('y2', d => processedData.nodes[d.target.id].y);
  });

  sim.force('link')
    .links(processedData.links)
    .distance(d => 40);

  d3
    .selectAll('.shuffle-memories')
      .on('click', () => {
        randomPopUp(nodeDataArray);
      });

  function dragstart(d) {
    if (!d3.event.active) { sim.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragend(d) {
    if (!d3.event.active) sim.alphaTarget(0);
    if (!d.outer) {
      d.fx = null;
      d.fy = null;
    }
  }


  openTagMenu();
  submitNewMemory();
});
