d3.json(jsonUrl, (err, data) => {
  data = data.sort((a, b) => d3.descending(a.avgRating, b.avgRating));

  let uniqueTags = [];
  data.forEach((d) => {
    uniqueTags.push(d.tag);
  });
  uniqueTags = uniqueTags.filter(onlyUnique);
  const nodePosition = [];

  let startingCx = 80;
  let startingCy = 80;
  const sortedByTag = {};

  uniqueTags.forEach((t) => {
    nodePosition[t] = {};
    nodePosition[t].cy = startingCx;
    nodePosition[t].cx = startingCy;
    startingCy += 200;
    startingCx += 200;
    sortedByTag[t] = {};

    data.forEach((d, i) => {
      if (d.tag == t) {
        sortedByTag[t][`node${d.id}`] = d;
      }
    });
  });

  const tagObject = {};
  const sortedWithDistances = [];

  uniqueTags.forEach((t) => {
    sortedWithDistances[t] = sortedByTag[t];
    let i = 0;
    for (const key in sortedWithDistances[t]) {
      if (i === 0) {
        var firstKey = sortedWithDistances[t][key];
        sortedWithDistances[t][key].distance = 0;
      } else {
        const difference =
          firstKey.avgRating - sortedWithDistances[t][key].avgRating;
        sortedWithDistances[t][key].distance = difference * 30;
      }
      i++;
    }
  });

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.likes)])
    .range([0, 30]);

  const circles = svg
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
        -sortedWithDistances[d.tag][`node${d.id}`].distance +
        nodePosition[d.tag].cx,
    )
    .attr('cx', d => nodePosition[d.tag].cy)
    .attr('x', 50)
    .attr('transform', (d) => {
      if (d.distance !== 0) {
        const radius = sortedWithDistances[d.tag][`node${d.id}`].distance;
        const length = Object.keys(sortedWithDistances[d.tag]).length;
        const angleIncrease = 360 - length;
        angleIncrease + angleIncrease;
        return `rotate(${angleIncrease}, ${radius}, ${radius})`;
      }
    })
    .attr('class', 'memory')
    .attr('r', d => rScale(d.likes))
    .style('fill', 'white');
});
