const { openTagMenu, showDeleteButton, hoveringOnDelete, hideDeleteButton, submitNewMemory, tagSorting } = require('../helpers/helpers.js');
const { width, height, jsonUrl, svg, fdGrp, nodeGrp, linkGrp } = require('./setup.js');
const { sortWithMax, binByTag, centralMaxNodesByTag, memoryNodesAndLinks } = require('../node_transformations');

const url = location.hostname ? '/memories' : jsonUrl;

d3.json(url, (err, data) => {
  formatData(data, render);
  openTagMenu();
  submitNewMemory();
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
  // sortedWithMax sorts each tag group to separate max memory (by likes) from others in its group
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
  console.log('HERE', processedData.links);
  callback(processedData, nodeDataArray);

  d3
    .selectAll('#testy')
    .on('click', () => {
      // formatUpdateData(fakeMemory, updateD3);
      processedData.links.push(fakeLink);
      processedData.nodes[fakeMemory.id] = fakeMemory;

      const nodeDataArray2 = [];
      Object.keys(processedData.nodes).forEach((key) => {
        nodeDataArray2.push(processedData.nodes[key]);
      });

      render(processedData, nodeDataArray2);
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
  // const fakeLink = {
  //   index: 100,
  //   source: {
  //     avgrating: 7.3,
  //     heading: 'testytesttest',
  //     id,
  //     index: 5,
  //     likes: 3,
  //     media_type: 'image',
  //     memory_asset_url: 'www.fake.com',
  //     memory_text: 'fake',
  //     tag: 'family',
  //     visits: 1,
  //     new: true,
  //     vx: -0.019367745561754825,
  //     vy: 0.04779610760031408,
  //     x: 110,
  //     y: 100,
  //   },
  //   target: {
  //     avgrating: 9,
  //     fx: null,
  //     fy: null,
  //     id: 2,
  //     index: 1,
  //     likes: 7,
  //     media_type: 'audio',
  //     memory_asset_url: 'testurl',
  //     memory_text: 'testMemoryText',
  //     tag: 'family',
  //     vx: -0.019332515501937816,
  //     vy: 0.047792649472173536,
  //     x: 181.29137564655827,
  //     y: 79.2135951126546,
  //   },
  // };
  const fakeLink = {
    index: 100,
    source: id,
    target: 2,
  };
};


function render(updatedData, nodeDataArray) {
  console.log('FIRST', updatedData.links);
  const t = d3.transition().duration(750);

  const rScale = d3
  .scaleSqrt()
  .domain([0, d3.max(nodeDataArray, d => d.likes)])
  .range([3, 8]);

  const links = linkGrp
  .selectAll('line.link')
  .data(updatedData.links);

  const nodes = nodeGrp
  .selectAll('circle.node')
  .data(nodeDataArray);

// EXIT old elements to be removed
  links
    .exit()
      .attr('class', 'exit')
    .transition(t)
      .style('fill-opacity', 0)
      .remove();

  nodes
    .exit()
      .attr('class', 'exit')
    .transition(t)
      .style('fill-opacity', 0)
      .remove();

// UPDATE old elements still in the data
  links
    .attr('x2', d => updatedData.nodes[d.target].x || updatedData.nodes[d.target.id].x,
    )
    .attr('y2', d => updatedData.nodes[d.target].y || updatedData.nodes[d.target.id].y,
    )
    .attr('x1', d => updatedData.nodes[d.source].x || updatedData.nodes[d.source.id].x,
    )
    .attr('y1', d => updatedData.nodes[d.source].y || updatedData.nodes[d.source.id].y,
  );

  nodes
    .attr('class', d => `memory ${d.tag}`)
    .attr('cy', d => d.y)
    .attr('cx', d => d.x)
    .attr('r', d => rScale(d.likes));

// ENTER new elements
  links
    .enter()
    .append('line')
      .attr('x2', (d) => {
        // console.log('d', d);
        // console.log('updatedData.nodes', updatedData.nodes);
        // console.log('d', d);
        // console.log('maybe now', d.target);
        // if (updatedData.nodes[d.target.id]) {
        //   console.dir(updatedData.nodes[d.target.id]);
        //   console.dir(updatedData.nodes[d.target.id].x);
        // }
        // console.log('updatedData.nodes[d.target]', updatedData.nodes[d.target]);
        if (!updatedData.nodes[d.target]) {
          return updatedData.nodes[d.target.id].x;
        }
        return updatedData.nodes[d.target].x;

        // return updatedData.nodes[d.target].x || updatedData.nodes[d.target.id].x;
      })
      .attr('y2', (d) => {
        if (!updatedData.nodes[d.target]) {
          return updatedData.nodes[d.target.id].y;
        }
        return updatedData.nodes[d.target].y;
      })
      .attr('x1', (d) => {
        if (!updatedData.nodes[d.source]) {
          return updatedData.nodes[d.source.id].x;
        }
        return updatedData.nodes[d.source].x;
      })
      .attr('y1', (d) => {
        if (!updatedData.nodes[d.source]) {
          return updatedData.nodes[d.source].y;
        }
        return updatedData.nodes[d.source].y;
      })
      .style('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', '0.8')
      .attr('class', d => `memory ${updatedData.nodes[d.source].tag}`);

  nodes
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
    $(this).addClass('active');
    showDeleteButton();
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    d3.select(this).style('fill', '#FDACAB');
    hoveringOnDelete();
  }

  function dragend(d) {
    if (!d3.event.active) sim.alphaTarget(0);
    if (!d.outer) {
      d.fx = null;
      d.fy = null;
    }
    $(this).removeClass('active');
    d3.select(this).style('fill', 'white');
    if ($('.delete-button').hasClass('deleting')) {
      const id = d3.select(this).attr('id');
      // Line below to be removed when loop is implemented
      d3.select(this).style('display', 'none');
      $('.delete-button').removeClass('deleting');
      $.ajax({
        type: 'DELETE',
        url: 'memories',
        data: { id },
      });
    }
    hideDeleteButton();
  }
  console.log('SECOND', updatedData);
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
