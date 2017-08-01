const { initTagMenu, showDeleteButton, hoveringOnDelete, hideDeleteButton, initSubmitMemory, tagSorting, constructTagList, showHeading, storePendingActions, removeMemoryFromStoredData, removeMemoriesDeletedOffline, updateOfflineLikes, hoveringOnDeleteSafari, deletePendingMemories } = require('../helpers/helpers.js');
const { animationDuration, width, height, jsonUrl, svg, fdGrp, nodeGrp, linkGrp } = require('./setup.js');
const { sortWithMax, binByTag, centralMaxNodesByTag, memoryNodesAndLinks } = require('../node_transformations');
const { appendPopUp, randomPopUp } = require('./modals.js');
const { newUserIntro } = require('./newUserIntro.js');

const url = location.hostname ? '/memories' : jsonUrl;

function onlineLogic() {
  d3.json(url, (err, data) => {
    if (data.length > 0) {
      const dataToSave = JSON.stringify(data);
      localStorage.setItem('data', dataToSave);
      constructTagList(data);
      render(formatData(data));
      initTagMenu();
    } else {
      const falseDataArray = [{ heading: 'test', id: 100, index: 0, likes: 5, visits: 1, x: 215, y: 170 }];
      const falseProcessedData = { links: [], nodes: falseDataArray };
      render(falseProcessedData);
      newUserIntro();
    }
    initSubmitMemory();
  });
}

const formatData = (data) => {
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

  // processedData returns a list of nodes and links
  const processedData = memoryNodesAndLinks(centralNodesByTag, sortedWithMax);

  return processedData;
};

function render(updatedData) {
  const nodeDataArray = [];
  Object.keys(updatedData.nodes).forEach((key) => {
    nodeDataArray.push(updatedData.nodes[key]);
  });

  svg
    .selectAll('.memory-group')
      .remove();

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(nodeDataArray, d => d.likes)])
    .range([3, 8]);

  function zoomed() {
    d3.select('.memory-group').attr('transform', d3.event.transform);
  }

  const fdGrp = svg
    .append('g')
      .attr('class', 'memory-group')
      .call(d3.zoom()
      .scaleExtent([1 / 3, 3])
      .on('zoom', zoomed));

  const linkGrp = fdGrp
    .append('g')
      .attr('class', 'links');

  const linksG = linkGrp
    .selectAll('line.link')
    .data(updatedData.links)
    .enter()
    .append('g');

  const links = linksG
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

  const nodeGrp = fdGrp
    .append('g')
      .attr('class', 'nodes');

  const nodesG = nodeGrp
    .selectAll('circle.node')
    .data(nodeDataArray)
    .enter()
    .append('g')
      .attr('id', d => `nodeGrp${d.id}`);

  const nodes = nodesG
    .append('circle')
      .attr('class', d => `memory ${d.tag}`)
      .attr('id', d => d.id)
      .attr('cy', d => d.y)
      .attr('cx', d => d.x)
      .attr('r', d => rScale(d.likes))
      .style('fill', 'white')
      .style('opacity', '0.8')
      .style('stroke', 'rgb(0, 0, 0)')
      .style('stroke-width', '30px')
      .style('stroke-opacity', '0')
      .call(d3.drag()
      .on('start', dragstart)
      .on('drag', dragging)
      .on('end', dragend))
      .on('click', (d) => {
        d3.selectAll('.memory-heading')
          .remove();
        appendPopUp(d);
      });

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
        .attr('x1', d =>
        updatedData.nodes[d.source.id].x)
        .attr('y1', d => updatedData.nodes[d.source.id].y)
        .attr('x2', d => updatedData.nodes[d.target.id].x)
        .attr('y2', d => updatedData.nodes[d.target.id].y);
    });

  sim.force('link')
    .links(updatedData.links)
    .distance(d => 40);

  sim.alphaTarget(0.3);

  d3.select('.shuffle-memories').on('click', () => {
    randomPopUp(nodeDataArray);
  });

  function dragstart(d) {
    if (!d3.event.active) {
      sim.alphaTarget(1).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
    $(this).addClass('active');
    showDeleteButton();
    showHeading(d);
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    d3.select(this).style('fill', '#FDACAB');
    const buttonTop = $('.delete-button').position().top;
    const nodeTop = d3.event.y;
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      const height = $('#desktop-background').height();
      const calculationForButtonTop = (height - buttonTop);
      hoveringOnDeleteSafari(nodeTop, calculationForButtonTop);
    } else {
      hoveringOnDelete(nodeTop, buttonTop);
    }
  }

  function dragend(d) {
    if (!d3.event.active) {
      sim.alphaTarget(0);
    }
    if (!d.outer) {
      d.fx = null;
      d.fy = null;

      d3.selectAll('.memory-heading')
        .remove();
    }

    $(this).removeClass('active');
    d3.select(this).style('fill', 'white');
    if ($('.delete-button').hasClass('deleting')) {
      const id = d3.select(this).attr('id');
      $('.delete-button').removeClass('deleting');
      if (navigator.onLine) {
        $.ajax({
          method: 'DELETE',
          url: 'memories',
          data: { id },
          success: update,
        });
      } else {
        storePendingActions('toDelete', { memories: [id] }, id);
        const offlineData = removeMemoryFromStoredData(id);
        render(formatData(offlineData));
      }
    }
    hideDeleteButton();
  }

  $('#memory-input__submit').click((e) => {
    e.preventDefault();
    if (navigator.onLine) {
      $.ajax({
        method: 'POST',
        url: 'memory-input-text',
        data: $('#add-text-form').serialize(),
        success: () => {
          setTimeout(() => {
            update();
          }, animationDuration);
        },
      });
    } else {
      const data = $('#add-text-form').serialize();
      const splitData = data.split('&');
      const heading = splitData[0].split('=')[1];
      const text = splitData[1].split('=')[1];
      const tag = splitData[2].split('=')[1];
      storePendingActions('textToAdd', { memories: [{ id: 100, heading, text, tag }] }, { id: 100, heading, text, tag });
      // const offlineData = removeMemoryFromStoredData(id);
      // render(formatData(offlineData));
    }
  });

  function update() {
    d3.json(url, (err, data) => {
      render(formatData(data));
    });
  }
}

if (navigator.onLine) {
  onlineLogic();
  updateOfflineLikes(onlineLogic);
  deletePendingMemories(onlineLogic);
} else {
  const offlineData = JSON.parse(localStorage.getItem('data'));
  constructTagList(offlineData);
  render(formatData(offlineData));
  initTagMenu();
  initSubmitMemory();
}
