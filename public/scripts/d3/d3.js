d3.json(echo.setup.jsonUrl, (err, data) => {
  const startingCx = 160;
  const startingCy = 120;

  data.sort((a, b) => d3.descending(a.avgRating, b.avgRating));

  const sortedByTag = echo.helpers.binByKey('tag', data);
  const tagPositions = sortedByTag.map((tagObj, i) =>
    ({ tag: tagObj.tag, cx: startingCx, cy: startingCy + 200 * i, nodes: tagObj.nodes }));

  const nodeTagsArrayToLinksAndNodes = function (tagNodesWithChildren) {
    const maxNodes = getHighestRated(tagNodesWithChildren);
    const restNodes = filterRestNodes(tagNodesWithChildren, maxNodes);
    echo.helpers.calculateXY(restNodes);
    const links = [];

    restNodes.map((sourceNode) => {
      let linkHolder = {};
      for (const keys in sourceNode) {
        linkHolder = { source: sourceNode[keys].id, target: maxNodes[sourceNode[keys].tag].id };
        links.push(linkHolder);
      }
    });
    const nodes = [];

    restNodes.forEach((r, i) => {
      for (keys in r) {
        nodes.push(r[keys]);
      }
    });
    for (var keys in maxNodes) {
      nodes.push(maxNodes[keys].bigD);
    }
    return { nodes, links };
  };

  function filterRestNodes(nodes, maxNodes) {
    const filtered = [];
    for (const key in nodes) {
      const filteredInGroup = nodes[key].nodes.filter((node) => {
        node.cx = maxNodes[node.tag].bigD.cx;
        node.cy = maxNodes[node.tag].bigD.cy;
        return node.id !== maxNodes[node.tag].bigD.id;
      });
      filtered.push(filteredInGroup);
    }
    return filtered;
  }

  function getHighestRated(nodes) {
    const maxNodeByTag = {};
    for (const keys in nodes) {
      const tag = nodes[keys].tag;
      maxNodeByTag[tag] = {};
      maxNodeByTag[tag].bigD = nodes[keys].nodes[0];
      maxNodeByTag[tag].id = nodes[keys].nodes[0].id;
      maxNodeByTag[tag].bigD.cx = nodes[keys].cx;
      maxNodeByTag[tag].bigD.cy = nodes[keys].cy;
      maxNodeByTag[tag].bigD.maxNode = true;
    }
    return maxNodeByTag;
  }

  const processedData = nodeTagsArrayToLinksAndNodes(tagPositions);

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(echo.setup.width / 2, echo.setup.height / 2))
    // Leave this in --> needs refactoring
    // .on('tick', ticked)
    .stop();

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(processedData.nodes, d => d.likes)])
    .range([0, 10]);

  const circles = echo.setup.svg
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
      .on('start', echo.animation.dragstarted)
      .on('drag', echo.animation.dragged)
      .on('end', echo.animation.dragended));

  const link = echo.setup.svg
    .selectAll('line')
    .data(processedData.links)
    .enter()
    .append('line');

  link
    .attr('x2', (d) => {
      let x2;
      for (const keys in processedData.nodes) {
        if (processedData.nodes[keys].id === d.target) {
          x2 = processedData.nodes[keys].cx;
        }
      }
      return x2;
    })
    .attr('y2', (d) => {
      let y2;
      for (const keys in processedData.nodes) {
        if (processedData.nodes[keys].id === d.target) {
          y2 = processedData.nodes[keys].cy;
        }
      }
      return y2;
    })
    .attr('x1', (d) => {
      let x1;
      for (const keys in processedData.nodes) {
        if (processedData.nodes[keys].id === d.source) {
          x1 = processedData.nodes[keys].cx;
        }
      }
      return x1;
    })
    .attr('y1', (d) => {
      let y1;
      for (const keys in processedData.nodes) {
        if (processedData.nodes[keys].id === d.source) {
          y1 = processedData.nodes[keys].cy;
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

  const memories = echo.setup.svg
    .selectAll('.memory');
});
