const { width, svg } = require('./setup.js');

const appendPopUp = (data) => {

  const holder = svg
    .append('g')
      .attr('class', 'popupBoxHolder')
      .attr('transform', 'translate(30, 50)') //change

  holder
    .append('rect')
      .attr('class', 'popupBox')
      .attr('fill', 'white') // change
      .attr('display', 'block')
      .attr('width', 300) // change
      .attr('height', 500) // change

  const textholder = holder
    .append('text')
      .attr('class', 'popupTextHolder')
      .attr('transform', 'translate(10, 10)')
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
