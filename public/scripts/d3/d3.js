d3.json(jsonUrl, function(err, data) {

  data = data.sort(function (a,b) {
    return d3.descending(a.avgRating, b.avgRating);
  });

  var uniqueTags = [];
  data.forEach(function(d){
    uniqueTags.push(d.tag)
  })
  uniqueTags = uniqueTags.filter(onlyUnique);
  var nodePosition = [];

  var startingCx = 0;
  var startingCy = 0;
  var sortedByTag = {};

  uniqueTags.forEach(function(t){
    nodePosition[t] = {};
    nodePosition[t].cy = startingCx;
    nodePosition[t].cx = startingCy;
    startingCy += 100;
    startingCx += 100;
    sortedByTag[t] = {};

    data.forEach(function(d, i){
      if (d.tag == t){
        sortedByTag[t][`node${i}`] = d;
      }
    });
  });



uniqueTags.forEach(function(t){
  var tagObject = sortedByTag[t]
  var i = 0;

  for (var key in tagObject){
    if (i === 0){
      var firstKey = tagObject[key];
      // console.log(firstKey);
    } else {
      var difference = firstKey.avgRating - tagObject[key].avgRating;
      tagObject[key].distance = difference * 2;
      console.log(tagObject[key]);
    }
    i++;
  }

})

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.likes)])
    .range([0, 30]);

  var circles = svg
    .selectAll('.memory')
    .data(data)
    .enter()
    .append('g')
      .attr('id', (d) => {
        return d.id
      })
      .attr('class', 'memoryG');

  circles
    .append('circle')
      .attr('cy', (d) => {
        var prevData = circles.data()[i-1];
      })
      .attr('cx', (d, i) => {
        if (i > 0) {
          var prevData = circles.data()[i-1];
          if (d.tag === prevData.tag){
            return startCx;
          } else {
            startCx += 100;
            return startCx;
          }
        }
      })
      .attr('x', 50)
      .attr('class', 'memory')
      .attr('r', d => rScale(d.likes))
      .style('fill', 'white');

})
