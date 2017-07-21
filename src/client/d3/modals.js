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


  const close = holder
    .append('image')
      .attr('xlink:href', './assets/icons/card_icons/close.svg')
      .attr('class', 'close')
      .style('fill', '#526173')
      .attr('transform', 'translate(10, 425)')
      .attr('width', 10)
      .attr('height', 10)
      .on('click', closePopUp);

  const likeButtonGroup = holder
    .append('g')
      .attr('class', 'likeButtonGroup')
      .attr('transform', 'translate(250, 400)')
      .attr('width', 40)
      .attr('height', 40)
      .on('click', () => {
        const newLikeNum = parseInt(d3.select('.likeNumber').text()) + 1;
        const memoryId = data.id;
        d3.select('.likeNumber').text(newLikeNum);
        $.ajax({
          type: 'POST',
          url: '/likes',
          data: { numLikes: newLikeNum, memoryId },
        });
      });

  const likeButton = likeButtonGroup
    .append('image')
      .attr('xlink:href', './assets/icons/card_icons/heart_icon_checked.svg')
      .attr('class', 'likeButton')
      .attr('width', 40)
      .attr('height', 40);

  const likeNumber = likeButtonGroup
    .append('text')
      .text(data.likes)
      .attr('class', 'likeNumber')
      .attr('width', 40)
      .attr('height', 40)
      .attr('transform', 'translate(12, 24)');

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
    const memoryId = data.id;
    $.ajax({
      method: 'GET',
      url: 'memory-input-photo',
      data: { memoryId },
      success: url => appendImage(url),
    });
    function appendImage(url) {
      popup
        .append('svg:image')
          .attr('class', 'mediaHolder')
          .attr('transform', 'translate(0, 0)')
          .attr('width', 300)
          .attr('height', 350)
          .attr('xlink:href', url)
          .attr('ry', 5);
      popup
        .append('text')
          .attr('class', 'mediaHeading')
          .attr('transform', 'translate(20, 350)')
          .style('fill', '#526173')
          .attr('font-family', 'Quicksand')
          .text(data.heading);
    }
  } else if (data.media_type === 'text_only') {
    popup
      .append('text')
        .attr('class', 'textHolder')
        .attr('transform', 'translate(10, 25)')
        .attr('x', 0)
        .attr('y', 0)
        .style('fill', '#526173')
        .attr('font-family', 'Quicksand')
        .text(data.memory_text)
        .call(wrap, data.memory_text, 285);
  } else if (data.media_type === 'audio') {
    popup
      .append('text')
        .attr('transform', 'translate(10, 25)')
        .text('audio to be added here'); // append svg image that on click plays audio
      // this will be added once we have set up s3.
  } else if (data.media_type === 'video') {
    popup
      .append('svg')
        .attr('transform', 'translate(10, 25)')
        .text('video to be added here'); // append video to svg
      // this will be added once we have set up s3.
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
