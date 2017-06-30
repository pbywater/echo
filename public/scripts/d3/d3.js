d3.json(echo.setup.jsonUrl, (err, data) => {
  data.sort((a, b) => d3.descending(a.avgRating, b.avgRating));

  const uniqueTags = data.map(d => d.tag).filter(echo.helpers.onlyUnique);

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
    echo.helpers.calculateXY(sortedWithDistances[keys]);
  }

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(echo.setup.width / 2, echo.setup.height / 2))
    .on('tick', ticked)
    .stop();

  const rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.likes)])
    .range([0, 10]);

  const circles = echo.setup.svg
    .selectAll('.memory')
    .data(data)
    .enter()
    .append('g')
    .attr('id', d => d.id)
    .attr('class', 'memoryG');

var startingTime = 500;
var smaller = 2500;

  circles
    .append('circle')
    .attr(
      'cy',
      (d) => {
        d.y =
        sortedWithDistances[d.tag][`node${d.id}`].yDistance +
        nodePosition[d.tag].cy;
        return d.y;
      },
    )
    .attr(
      'cx',
      (d) => {
        d.x = sortedWithDistances[d.tag][`node${d.id}`].xDistance +
        nodePosition[d.tag].cx;
        return d.x;
      },
    )
    .attr('class', 'memory')
    .attr('r', d => rScale(d.likes))
    .style('fill', 'white')
    .call(d3.drag()
      .on('start', echo.animation.dragstarted)
      .on('drag', echo.animation.dragged)
      .on('end', echo.animation.dragended))
    .call((d) => {
      pulse(1000, 5);
    })
    .call((d) => {
      pulse(2000, 0);
    })



  function pulse(time, size){
      setInterval(function(){
        memories
          .attr('r', (d) => rScale(d.likes) + size)
      }, time)
    }

  const link = echo.setup.svg
    .selectAll('line')
    .data(data)
    .enter()
    .append('line');

  link
    .attr('x2', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      d.source = d;
      if (sourceId !== 'source') {
        return sortedWithDistances[d.tag][`node${sourceId}`].xDistance +
        nodePosition[d.tag].cx;
      }

      return sortedWithDistances[d.tag][`node${d.id}`].xDistance +
        nodePosition[d.tag].cx;
    })
    .attr('y2', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      if (sourceId !== 'source') {
        return sortedWithDistances[d.tag][`node${sourceId}`].yDistance +
        nodePosition[d.tag].cy;
      }

      return sortedWithDistances[d.tag][`node${d.id}`].yDistance +
        nodePosition[d.tag].cy;
    })
    .attr('x1', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      if (sourceId !== 'source') {
        data.forEach((t) => {
          if (t.id === sourceId) {
            d.target = t;
          }
        });
      }
      return sortedWithDistances[d.tag][`node${d.id}`].xDistance +
        nodePosition[d.tag].cx;
    })
    .attr('y1', (d) => {
      const sourceId = sortedWithDistances[d.tag][`node${d.id}`].target;
      return sortedWithDistances[d.tag][`node${d.id}`].yDistance +
        nodePosition[d.tag].cy;
    })
    .style('stroke', 'white')
    .style('stroke-width', '3px');

  simulation.nodes(circles);
  simulation.force('link').links(link);
  simulation.restart();

  function ticked() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    circles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  var memories = echo.setup.svg
    .selectAll('.memory');

});
