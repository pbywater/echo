const { width, svg } = require('./setup.js');

const appendPopUp = (data) => {

  const holder = svg
    .append('g')
      .attr('class', 'popupBoxHolder')
      .attr('transform', 'translate(0, 0)')

  holder
    .append('rect')
      .attr('class', 'popupBox')
      .attr('fill', 'white') // change
      .attr('display', 'block')
      .attr('width', 180) // change
      .attr('height', 180) // change

  const textholder = holder
    .append('text')
      .attr('class', 'popupTextHolder')
      .text(data.tag) // change

  const close = holder // all of this will change
    .append('rect')
      .attr('class', 'close')
      .style('fill', 'red')
      .attr('width', 10)
      .attr('height', 10)
      .on('click', closepopup)
}

const closepopup = () => {
  svg
    .selectAll('.popupBoxHolder')
      .remove();
}

module.exports = appendPopUp;
