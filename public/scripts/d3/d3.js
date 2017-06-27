d3.json(jsonUrl, (err, data) => {
  data = data.sort((a, b) => d3.descending(a.avgRating, b.avgRating));

  let uniqueTags = [];
  data.forEach((d) => {
    uniqueTags.push(d.tag);
  });
  uniqueTags = uniqueTags.filter(onlyUnique);
  const nodePosition = [];

  let startingCx = 0;
  let startingCy = 0;
  const sortedByTag = {};

  uniqueTags.forEach((t) => {
    nodePosition[t] = {};
    nodePosition[t].cy = startingCx;
    nodePosition[t].cx = startingCy;
    startingCy += 100;
    startingCx += 100;
    sortedByTag[t] = {};

    data.forEach((d, i) => {
      if (d.tag == t) {
        sortedByTag[t][`node${i}`] = d;
      }
    });
  });

  let tagObject = {};
  const sortedWithDistances = [];

  uniqueTags.forEach((t) => {
    tagObject = sortedByTag[t];
    let i = 0;
    for (const key in tagObject) {
      if (i === 0) {
        var firstKey = tagObject[key];
        tagObject[key].distance = 0;
      } else {
        const difference = firstKey.avgRating - tagObject[key].avgRating;
        tagObject[key].distance = difference * 2;
      }
      i++;
    }
    sortedWithDistances.push(tagObject);
  });

  console.log(sortedWithDistances);

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.likes)])
    .range([0, 30]);

  const circles = svg
    .selectAll('.memory')
    .data(sortedWithDistances)
    .enter()
    .append('g')
    .attr('id', d => d.id)
    .attr('class', 'memoryG');

  circles
    .append('circle')
    .attr('cy', (d) => {
      // nodePosition[d.tag].cy;
    })
    .attr('cx', d => nodePosition[d.tag].cx)
    .attr('x', 50)
    .attr('class', 'memory')
    .attr('r', d => rScale(d.likes))
    .style('fill', 'white');
});
