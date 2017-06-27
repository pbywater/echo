d3.json(jsonUrl, function(err, data) {

  var tags = [];
  data.forEach(function(d){
    tags.push(d.tag)
  })
  var uniqueTags = tags.filter(onlyUnique);

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

var startCy = 0;
var startCx = 0;

  circles
    .append('circle')
      .attr('cy', (d, i) => {
        if (i > 0) {
          var prevData = circles.data()[i-1];
          if (d.tag === prevData.tag){
            return startCy;
          } else {
            startCy += 100;
            return startCy;
          }
        }
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
