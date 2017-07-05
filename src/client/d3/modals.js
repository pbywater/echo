const { svg } = require('./setup');
const { getRandomInt } = require('./../helpers/helpers');

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
      .attr('ry', 5); //change probably

  const textholder = holder
    .append('text')
      .attr('class', 'popupTextHolder')
      .attr('transform', 'translate(10, 20)')
      .text(data.tag); // Modal info will be heading, memory etc. It's not been passed through yet.

  const close = holder // all of this will change
    .append('rect')
      .attr('class', 'close')
      .style('fill', 'red')
      .attr('transform', 'translate(10, 20)')
      .attr('width', 10)
      .attr('height', 10)
      .on('click', closePopUp);
}

const closePopUp = () => {
  svg
    .selectAll('.popupBoxHolder')
      .remove();
}

const randomPopUp = (data) => {
  const index = getRandomInt(0, data.length - 1);
  appendPopUp(data[index]);
}

module.exports = {
  appendPopUp,
  randomPopUp,
}
