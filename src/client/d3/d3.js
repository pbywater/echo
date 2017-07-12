const { tagSorting, openTagMenu, submitNewMemory } = require('../helpers/helpers.js');
const { width, height, jsonUrl, svg, fdGrp, nodeGrp, linkGrp } = require('./setup.js');
const { sortWithMax, binByTag, centralMaxNodesByTag, memoryNodesAndLinks } = require('../node_transformations');

const url = location.hostname ? '/memories' : jsonUrl;

console.log(url);

d3.json(url, (err, data) => {
  if (err) { console.log(err); }
  console.log('hey');
  console.log(data);
  formatData(data, render);
  openTagMenu();
  submitNewMemory();

  d3
    .selectAll('#testy')
    .on('click', () => {
      // formatUpdateData(fakeMemory, updateD3);
      processedData.links.push(fakeLink);
      processedData.nodes[fakeMemory.id] = fakeMemory;

      formatData(processedData, render);
      // data[data.length] =
      // const update = svg
      //   .selectAll('circle')
      //   .data(fakeMemory);
      //
      // update
      //       .enter()
      //       .append('circle')
      //       .attr('cx', 0)
      //       .attr('cy', 0)
      //       .attr('r', 10)
      //       .merge(update);
    });

  const id = generatenum();

  const fakeMemory =
    {
      avgrating: 7.3,
      heading: 'testytesttest',
      id,
      index: 5,
      likes: 3,
      media_type: 'image',
      memory_asset_url: 'www.fake.com',
      memory_text: 'fake',
      tag: 'family',
      visits: 1,
      new: true,
      vx: 0,
      vy: 0,
      x: 110,
      y: 100,
    };
  const fakeLink = [{ 100: {
    index: 100,
    source: {
      avgrating: 7.3,
      heading: 'testytesttest',
      id,
      index: 5,
      likes: 3,
      media_type: 'image',
      memory_asset_url: 'www.fake.com',
      memory_text: 'fake',
      tag: 'family',
      visits: 1,
      new: true,
      vx: -0.019367745561754825,
      vy: 0.04779610760031408,
      x: 110,
      y: 100,
    },
    target: {
      avgrating: 9,
      fx: null,
      fy: null,
      id: 2,
      index: 1,
      likes: 7,
      media_type: 'audio',
      memory_asset_url: 'testurl',
      memory_text: 'testMemoryText',
      tag: 'family',
      vx: -0.019332515501937816,
      vy: 0.047792649472173536,
      x: 181.29137564655827,
      y: 79.2135951126546,
    },
  },
  }];
});

// DELETE THIS
let id = 100;
const generatenum = function () {
  id += 1;
  return id;
};

const formatData = (data, callback) => {
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
  console.log('qwe');
  callback(processedData, nodeDataArray);
};


function render(updatedData, nodeDataArray) {
  console.log('kdfgnldfk');
  console.log(nodeDataArray);
  const t = d3.transition().duration(2000);

  const rScale = d3
  .scaleSqrt()
  .domain([0, d3.max(nodeDataArray, d => d.likes)])
  .range([3, 8]);

  const links = linkGrp
  .selectAll('line.link')
  .data(updatedData.links)
  .enter()
  .append('line')
    .attr('x2', d => updatedData.nodes[d.target].x,
    )
    .attr('y2', d => updatedData.nodes[d.target].y,
    )
    .attr('x1', d => updatedData.nodes[d.source].x,
    )
    .attr('y1', d => updatedData.nodes[d.source].y,
    )
    .style('stroke', 'white')
    .style('stroke-width', '2px')
    .style('opacity', '0.8')
    .attr('class', d => `memory ${updatedData.nodes[d.source].tag}`);


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
    .call(d3.drag()
      .on('start', dragstart)
      .on('drag', dragging)
      .on('end', dragend));

  const sim = d3.forceSimulation()
  .force('link', d3.forceLink(updatedData).id(d => d.id))
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
    updatedData.nodes[d.source.id].x)
    .attr('y1', d => updatedData.nodes[d.source.id].y)
    .attr('x2', d => updatedData.nodes[d.target.id].x)
    .attr('y2', d => updatedData.nodes[d.target.id].y);
});

  sim.force('link')
  .links(updatedData.links)
  .distance(d => 40);

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
}

// const formatUpdateData = function (data) {
//   console.log(data);
//   const getMemoryNodePositions = (tagNode, numTagMemories, memoryIndex, currentavgrating) => {
//   // 1. pull out tag
//   // 2. find max tag
//   // 3. Get x and y coordinates
//   // 4. generate link
// };
//
// const updateD3 = function (data) {
//   console.log(data);
// };
