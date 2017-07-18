const { openTagMenu, showDeleteButton, hoveringOnDelete, hideDeleteButton, submitNewMemory, tagSorting } = require('../helpers/helpers.js');
const { width, height, jsonUrl, svg, fdGrp, nodeGrp, linkGrp } = require('./setup.js');
const { sortWithMax, binByTag, centralMaxNodesByTag, memoryNodesAndLinks } = require('../node_transformations');
const { appendPopUp, randomPopUp } = require('./modals.js');

const url = location.hostname ? '/memories' : jsonUrl;

d3.json(url, (err, data) => {
  formatData(data, render);
  openTagMenu();
  submitNewMemory();
});

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
  callback(processedData, nodeDataArray);
};

function render(updatedData, nodeDataArray) {
  // const t = d3.transition().duration(750);

  const rScale = d3
  .scaleSqrt()
  .domain([0, d3.max(nodeDataArray, d => d.likes)])
  .range([3, 8]);

  let links = linkGrp
  .selectAll('line.memory')
  .data(updatedData.links, d => d.target.id);

  let nodes = nodeGrp
  .selectAll('circle.memory')
  .data(nodeDataArray, d => d.id);

// EXIT old elements to be removed
  links
    .exit()
      .style('fill-opacity', 0)
      .remove();

  nodes
    .exit()
      .style('fill-opacity', 0)
      .remove();

  function zoomed() {
    d3.select('.memory-group').attr('transform', d3.event.transform);
  }

  const fdGrp = svg
    .append('g')
    .attr('class', 'memory-group')
    .call(d3.zoom()
      .scaleExtent([1 / 3, 3])
      .on('zoom', zoomed));

// UPDATE old elements still in the data
  links
    .attr('x2', d => updatedData.nodes[d.target].x,
    )
    .attr('y2', d => updatedData.nodes[d.target].y,
    )
    .attr('x1', d => updatedData.nodes[d.source].x,
    )
    .attr('y1', d => updatedData.nodes[d.source].y,
  );

  nodes
    .attr('class', d => `memory ${d.tag}`)
    .attr('cy', d => d.y)
    .attr('cx', d => d.x)
    .attr('r', d => rScale(d.likes));

// ENTER new elements
  const enterLinks = links
    .enter()
    .append('line')
      .attr('id', d => d.id)
      .attr('x2', (d) => {
        if (!updatedData.nodes[d.target]) {
          return updatedData.nodes[d.target.id].x;
        }
        return updatedData.nodes[d.target].x;
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
          return updatedData.nodes[d.source.id].y;
        }
        return updatedData.nodes[d.source].y;
      })
      .style('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', '0.8')
      .attr('class', (d) => {
        if (!updatedData.nodes[d.source]) {
          return `memory ${updatedData.nodes[d.source.id].tag}`;
        }
        return `memory ${updatedData.nodes[d.source].tag}`;
      });

  links = enterLinks.merge(links);

  const enterNodes = nodes
    .enter()
    .append('circle')
      .attr('class', d => `memory ${d.tag}`)
      .attr('cy', d => d.y)
      .attr('cx', d => d.x)
      .attr('r', d => rScale(d.likes))
      .attr('id', d => d.id)
      .style('fill', 'white')
      .style('opacity', '0.8')
      .call(d3.drag()
        .on('start', dragstart)
        .on('drag', dragging)
        .on('end', dragend))
      .on('click', (d) => {
        appendPopUp(d);
      });

  nodes = enterNodes.merge(nodes);

  const sim = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('forceX', d3.forceX().strength(0.5).x(d => d.x))
    .force('forceY', d3.forceY().strength(0.5).y(d => d.y))
    .force('center', d3.forceCenter(180, 320));

  sim
  .nodes(nodeDataArray)
  .on('tick', () => {
    nodes
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);
    links
    .attr('x1', d => updatedData.nodes[d.source.id].x)
    .attr('y1', d => updatedData.nodes[d.source.id].y)
    .attr('x2', d => updatedData.nodes[d.target.id].x)
    .attr('y2', d => updatedData.nodes[d.target.id].y);
  });

  sim.force('link')
  .links(updatedData.links)
  .distance(d => 40);

  sim.restart();

  d3.select('.shuffle-memories').on('click', () => {
    randomPopUp(nodeDataArray);
  });

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
      $('.delete-button').removeClass('deleting');
      $.ajax({
        method: 'DELETE',
        url: 'memories',
        data: { id },
        success: () => update(),
      });
    }
    hideDeleteButton();
    sim.restart();
  }

  $('#memory-input__submit').click((e) => {
    const data = $('#add-text-form').serialize();
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'memory-input-text',
      data: $('#add-text-form').serialize(),
      success: () => setTimeout(() => {
        update();
      }, 2000),
    });
  });

  function update() {
    d3.json(url, (err, data) => {
      formatData(data, render);
      sim.restart();
    });
  }
}
