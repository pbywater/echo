const { svg } = require('./setup');
const { getRandomInt } = require('./../helpers/helpers');

const appendPopUp = (data) => {
  const holder = svg
    .append('g')
      .attr('class', 'popupBoxHolder')
      .attr('transform', 'translate(30, 80)');

  holder
    .append('rect')
      .attr('class', 'popupBox')
      .attr('fill', 'white')
      .attr('display', 'block')
      .attr('width', 300)
      .attr('height', 450)
      .attr('ry', 5);
  //
  // const textholder = holder
  //   .append('text')
  //     .attr('class', 'popupTextHolder')
  //     .attr('transform', 'translate(10, 20)')
  //     .text(data.tag); // Modal info will be heading, memory etc. It's not been passed through yet.

  const close = holder // all of this will change
    .append('rect')
      .attr('class', 'close')
      .style('fill', 'red')
      .attr('transform', 'translate(10, 425)')
      .attr('width', 10)
      .attr('height', 10)
      .on('click', closePopUp);

  appendMedia(data);
};

const closePopUp = () => {
  svg
    .selectAll('.popupBoxHolder')
      .remove();
};

const randomPopUp = (data) => {
  const index = getRandomInt(0, data.length - 1);
  appendPopUp(data[index]);
};

const appendMedia = (data) => {
  const popup = svg
    .selectAll('.popupBoxHolder');

  if (data.media_type === 'image') {
    popup
      .append('svg:image')
        .attr('class', 'mediaHolder')
        .attr('transform', 'translate(0, 0)')
        .attr('width', 300)
        .attr('height', 350)
        .attr('xlink:href', data.memory_asset_url)
        .attr('ry', 5);
  } else if (data.media_type === 'text_only') {
    popup
      .append('text')
        .attr('class', 'textHolder')
        .attr('transform', 'translate(10, 25)')
        .attr('x', 0)
        .attr('y', 0)
        .text(data.memory_text)
        .call(wrap, data.memory_text, 290);
  } else if (data.media_type === 'audio') {
    popup
      .append('svg'); // append svg image that on click plays audio
  } else if (data.media_type === 'video') {
    popup
      .append('svg'); // how do you append a video to an svg. How do we store it in S3? All these questions.
  }
};

function wrap(element, textToAdd, width) {
  element.each(function () {
    let text = d3.select(this),
      words = textToAdd.split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      x = element.attr('x'),
      y = element.attr('y'),
      dy = 0, // parseFloat(text.attr("dy")),
      tspan = element.text(null)
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', `${dy}em`);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = element.append('tspan')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('dy', `${++lineNumber * lineHeight + dy}em`)
                            .text(word);
      }
    }
  });
}


module.exports = {
  appendPopUp,
  randomPopUp,
};
