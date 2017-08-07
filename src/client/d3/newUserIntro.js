
function newUserIntro() {
  const textGroup = d3.select('#nodeGrp1')
  .append('g')
    .attr('transform', 'translate(110,100)')
    .attr('class', 'text-group-1')
    .on('click', () => {
      d3.select('.text-group-1')
        .attr('class', 'text-group-2');
      d3.select('.welcome')
        .transition()
          .duration(500)
        .style('opacity', 0)
        .transition()
          .delay(500)
          .duration(500)
        .attr('transform', 'translate(-95,0)')
        .text('Save and revisit your thoughts and memories')
        .style('opacity', 1);
      d3.select('.tap')
        .transition()
          .duration(500)
        .style('opacity', 0)
        .transition()
          .delay(1000)
          .duration(500)
        .style('opacity', 1);
      d3.select('.text-group-2').on('click', () => {
        d3.select('.text-group-2')
        .attr('class', 'text-group-3');
        d3.select('.welcome')
        .transition()
          .duration(500)
        .style('opacity', 0)
        .transition()
          .delay(500)
          .duration(500)
        .attr('transform', 'translate(-95,200)')
        .text('Your first memory will be saved in this bubble')
        .style('opacity', 1);
        d3.select('.tap')
        .transition()
          .duration(500)
        .style('opacity', 0)
        .transition()
          .delay(1000)
          .duration(500)
        .attr('transform', 'translate(-20,248)')
        .style('opacity', 1);
        d3.select('.text-group-3')
        .on('click', () => {
          d3.select('.text-group-3')
          .attr('class', 'text-group-4');
          d3.select('.tap')
          .transition()
            .duration(500)
          .style('opacity', 0);
          d3.select('.welcome')
          .transition()
            .duration(500)
          .style('opacity', 0)
          .transition()
            .delay(500)
            .duration(500)
          .attr('transform', 'translate(-60,430)')
          .text('Tap this menu button to get started')
          .style('opacity', 1);
          d3.select('.menu-open-button')
          .on('click', () => {
            d3.select('.text-group-4').remove();
          });
        });
      });
    });

  const welcome = textGroup
      .append('text')
        .attr('class', 'welcome')
        .text('Welcome to Echo')
        .attr('fill', 'white')
        .style('opacity', 0)
        .transition()
          .duration(500)
        .style('opacity', 1);

  const tap = textGroup
        .append('text')
          .attr('class', 'tap')
          .text('(tap here to continue)')
          .attr('fill', 'white')
          .attr('transform', 'translate(-15,30)')
          .style('opacity', 0)
          .transition()
            .delay(500)
            .duration(500)
          .style('opacity', 1);
}

module.exports = {
  newUserIntro,
};
