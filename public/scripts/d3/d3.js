d3.json(echo.margins.jsonUrl, (err, data) => {
  data.sort((a, b) => d3.descending(a.avgRating, b.avgRating));

  const uniqueTags = data.map(d => d.tag).filter(onlyUnique);

  const nodePosition = [];
  const startingCx = 160;
  let startingCy = 120;
  const sortedByTag = {};

  uniqueTags.forEach((t) => {
    nodePosition[t] = {};
    nodePosition[t].cx = startingCx;
    nodePosition[t].cy = startingCy;
    startingCy += 200;
    sortedByTag[t] = {};

    data.forEach((d) => {
      if (d.tag === t) {
        sortedByTag[t][`node${d.id}`] = d;
      }
    });
  });

  const sortedWithDistances = [];

  uniqueTags.forEach((t) => {
    sortedWithDistances[t] = sortedByTag[t];
    let i = 0;
    let firstKey;
    for (const key in sortedWithDistances[t]) {
      if (i === 0) {
        firstKey = sortedWithDistances[t][key];
        sortedWithDistances[t][key].distance = 0;
        sortedWithDistances[t][key].target = 'source';
      } else {
        const difference =
        firstKey.avgRating - sortedWithDistances[t][key].avgRating;
        sortedWithDistances[t][key].distance = difference * 30;
        sortedWithDistances[t][key].target = firstKey.id;
      }
      i += 1;
    }
  });

  for (const keys in sortedWithDistances) {
    calculateXY(sortedWithDistances[keys]);
  }

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.likes)])
    .range([0, 10]);

  const circles = echo.margins.svg
    .selectAll('.memory')
    .data(data)
    .enter()
    .append('g')
    .attr('id', d => d.id)
    .attr('class', 'memoryG');

  circles
    .append('circle')
    .attr(
      'cy',
      d =>
        sortedWithDistances[d.tag][`node${d.id}`].yDistance +
        nodePosition[d.tag].cy,
    )
    .attr(
      'cx',
      d =>
        sortedWithDistances[d.tag][`node${d.id}`].xDistance +
        nodePosition[d.tag].cx,
    )
    .attr('class', 'memory')
    .attr('r', d => rScale(d.likes))
    .style('fill', 'white');

  const link = echo.margins.svg
    .selectAll('line')
    .data(data)
    .enter()
    .append('line');

  link
    .attr('x1', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      if (sourceId !== 'source') {
        return (
          sortedWithDistances[d.tag][`node${sourceId}`].xDistance +
          nodePosition[d.tag].cx
        );
      }
    })
    .attr('y1', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      if (sourceId !== 'source') {
        return (
          sortedWithDistances[d.tag][`node${sourceId}`].yDistance +
          nodePosition[d.tag].cy
        );
      }
    })
    .attr('x2', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      if (sourceId !== 'source') {
        return (
          sortedWithDistances[d.tag][`node${d.id}`].xDistance +
          nodePosition[d.tag].cx
        );
      }
    })
    .attr('y2', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      if (sourceId !== 'source') {
        return (
          sortedWithDistances[d.tag][`node${d.id}`].yDistance +
          nodePosition[d.tag].cy
        );
      }
    })
    .style('stroke', 'white')
    .style('stroke-width', '3px');
});
