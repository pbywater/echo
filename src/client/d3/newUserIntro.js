const { svg } = require('./setup.js');

function newUserIntro() {
  // const fdGrp = svg
  // .append('g')
  //   .attr('class', 'memory-group');
  //
  // const nodeGrp = fdGrp
  // .append('g')
  //   .attr('class', 'nodes');
  //
  // const nodes = nodeGrp
  //   .selectAll('circle.node')
  //   .data(falseDataArray)
  //   .enter()
  //   .append('circle')
  //     .attr('cy', d => d.y)
  //     .attr('cx', d => d.x)
  //     .attr('r', 4)
  //     .style('fill', 'white')
  //     .style('opacity', '0.8')
  //     .call(d3.drag()
  //       .on('start', dragstart)
  //       .on('drag', dragging)
        // .on('end', dragend));

  const textGroup = nodeGrp
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


  // const sim = d3.forceSimulation()
//       .force('forceX', d3.forceX(falseDataArray).strength(0.5).x(d => d.x))
//       .force('forceY', d3.forceY(falseDataArray).strength(0.5).y(d => d.y))
//       .force('center', d3.forceCenter(180, 320));
//
//   sim
//     .nodes(falseDataArray)
//     .on('tick', () => {
//       nodes
//         .attr('cx', d => d.x)
//         .attr('cy', d => d.y);
//     });
//
//
//   function dragstart(d) {
//     if (!d3.event.active) { sim.alphaTarget(0.3).restart(); }
//     d.fx = d.x;
//     d.fy = d.y;
//     $(this).addClass('active');
//   }
//
//   function dragging(d) {
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
//     d3.select(this).style('fill', '#FDACAB');
//   }
//
//   function dragend(d) {
//     if (!d3.event.active) sim.alphaTarget(0);
//     if (!d.outer) {
//       d.fx = null;
//       d.fy = null;
//     }
//     d3.select(this).style('fill', 'white');
//     $(this).removeClass('active');
//   }
// }
}

module.exports = {
  newUserIntro,
};
