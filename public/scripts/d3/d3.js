d3.json(jsonUrl, function(err, data) {

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
      .attr('class', 'memoryG')

  circles
    .append('circle')
      .attr('cy', 0)
      .attr('cx', 0)
      .attr('class', 'memory')
      .attr('r', d => rScale(d.likes))
      .style('fill', 'white');

})
