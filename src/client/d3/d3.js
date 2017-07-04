// const { calculateXY, binByKey } = require('../helpers/helpers.js');
const { width, height, jsonUrl, svg } = require('./setup.js');
const { dragstarted, dragged, dragended } = require('./animation.js');
const { sortWithMax, binByTag, tagNodesByTag, memoryNodesAndLinks, generateId } = require('../node_transformations');


d3.json(jsonUrl, (err, data) => {
  const binnedByTag = binByTag(data);
  const sortedWithMax = [];
  Object.keys(binnedByTag).forEach((tagKey) => {
    sortedWithMax.push(sortWithMax(binnedByTag[tagKey]));
  });
  const taggedNodesByTag = tagNodesByTag(sortedWithMax, 160, 120, generateId());
  const processedData = memoryNodesAndLinks(taggedNodesByTag, sortedWithMax);
  console.log('processedData is ', processedData);


  // const startingCx = 160;
  // const startingCy = 120;
  // const nodes = [];
  //
  // const filterRestNodes = (nodes, maxNodesByTag) => {
  //   const filtered = [];
  //   for (const key in nodes) {
  //     const filteredInGroup = nodes[key].nodes.filter((node) => {
  //       node.cx = maxNodesByTag[node.tag].bigD.cx;
  //       node.cy = maxNodesByTag[node.tag].bigD.cy;
  //       return node.id !== maxNodesByTag[node.tag].bigD.id;
  //     });
  //     filtered.push(filteredInGroup);
  //   }
  //   return filtered;
  // };
  //
  // function getHighestRated(nodes) {
  //   const maxNodeByTag = {};
  //   for (const key in nodes) {
  //     const tag = nodes[key].tag;
  //     maxNodeByTag[tag] = {};
  //     maxNodeByTag[tag].bigD = nodes[key].nodes[0];
  //     maxNodeByTag[tag].id = nodes[key].nodes[0].id;
  //     maxNodeByTag[tag].bigD.cx = nodes[key].cx;
  //     maxNodeByTag[tag].bigD.cy = nodes[key].cy;
  //     maxNodeByTag[tag].bigD.maxNode = true;
  //   }
  //   return maxNodeByTag;
  // }
  //
  //
  //
  // const sortedByTag = binByKey('tag', data);
  // const tagPositions = sortedByTag.map((tagObj, i) =>
  //   ({ tag: tagObj.tag, cx: startingCx, cy: startingCy + 200 * i, nodes: tagObj.nodes }));
  //
  // const nodeTagsArrayToLinksAndNodes = (tagNodesWithChildren) => {
  //   const maxNodesByTag = getHighestRated(tagNodesWithChildren);
  //   const restNodes = filterRestNodes(tagNodesWithChildren, maxNodesByTag);
  //   calculateXY(restNodes);
  //   const links = [];
  //
  //   restNodes.map((sourceNode) => {
  //     let linkHolder = {};
  //     for (const key in sourceNode) {
  //       linkHolder = { source: sourceNode[key].id, target: maxNodesByTag[sourceNode[key].tag].id };
  //       links.push(linkHolder);
  //     }
  //   });
  //
  //   restNodes.forEach((r, i) => {
  //     for (key in r) {
  //       nodes.push(r[key]);
  //     }
  //   });
  //   for (const key in maxNodesByTag) {
  //     nodes.push(maxNodesByTag[key].bigD);
  //   }
  //   return { nodes, links };
  // };
  //
  //
  // const processedData = nodeTagsArrayToLinksAndNodes(tagPositions);

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    // Leave this in --> needs refactoring
    // .on('tick', ticked)
    .stop();

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(processedData.nodes, d => d.likes)])
    .range([0, 10]);

  const circles = svg
    .selectAll('.memory')
    .data(processedData.nodes)
    .enter()
    .append('g')
    .attr('id', d => d.id)
    .attr('class', 'memoryG');

  circles
    .append('circle')
    .attr('cy', d => d.cy)
    .attr('cx', d => d.cx)
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
    .attr('x2', (d) => {
      let x2;
      for (const key in processedData.nodes) {
        if (processedData.nodes[key].id === d.target) {
          x2 = processedData.nodes[key].cx;
        }
      }
      return x2;
    })
    .attr('y2', (d) => {
      let y2;
      for (const key in processedData.nodes) {
        if (processedData.nodes[key].id === d.target) {
          y2 = processedData.nodes[key].cy;
        }
      }
      return y2;
    })
    .attr('x1', (d) => {
      let x1;
      for (const key in processedData.nodes) {
        if (processedData.nodes[key].id === d.source) {
          x1 = processedData.nodes[key].cx;
        }
      }
      return x1;
    })
    .attr('y1', (d) => {
      let y1;
      for (const key in processedData.nodes) {
        if (processedData.nodes[key].id === d.source) {
          y1 = processedData.nodes[key].cy;
        }
      }
      return y1;
    })
    .style('stroke', 'white')
    .style('stroke-width', '3px');

  simulation.nodes(circles);
  simulation.force('link').links(link);
  simulation.restart();

  // Leave this in --> needs refactoring
  // function ticked() {
  //   link
  //     .attr('x1', d => d.source.x)
  //     .attr('y1', d => d.source.y)
  //     .attr('x2', d => d.target.x)
  //     .attr('y2', d => d.target.y);
  //   circles
  //     .attr('cx', d => d.x)
  //     .attr('cy', d => d.y);
  // }

  const memories = svg
    .selectAll('.memory');
});
