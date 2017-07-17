/* eslint-disable */
const normalTime = 1000;

const binByKey = (key, xs) =>
  xs.reduce((binnedArray, elem) => {
    const targetBin = binnedArray[elem[key]];
    if (targetBin === undefined) {
      binnedArray[elem[key]] = [];
    }

    binnedArray[elem[key]].push(elem);
    return binnedArray;
  }, {});

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function showTaggedMemory(memoryToShow) {
  $('.memory').each(function () {
    if ($(this).hasClass(memoryToShow)) {
      $(this).show();
    }
  });
}

function showMemoriesByActiveTags() {
  $('.memory').hide();
  $('.tagLabel').each(function () {
    if ($(this).is(':visible')) {
      const tag = $(this).text();
      showTaggedMemory(tag);
    }
  });
}

function hideOtherTags(tagToKeep) {
  $('.tagLabel').each(function () {
    const tagLabel = $(this).text().replace(/\s+/g, '');
    if (tagLabel !== tagToKeep) {
      $(this).parent().hide();
    }
  });
}

function hideOtherMemories(memoryTagToKeep) {
  $('.memory').each(function () {
    if (!$(this).hasClass(memoryTagToKeep)) {
      $(this).hide();
    }
  });
}

function tagSorting() {
  $('.tagLabel').on('click', function () {
    const clickedTag = $(this).text().replace(/\s+/g, '');
    hideOtherTags(clickedTag);
    hideOtherMemories(clickedTag);
  });
}

function clearButton() {
  $('.clear-tags').on('click', () => {
    $('.memory').show();
    $('.tag-container').show();
  });
}

function removingTags() {
  $('.filter-tags').on('click', function () {
    $(this).parent().hide();
    showMemoriesByActiveTags();
  });
}

function closeTagMenu() {
  $('.close-tags').on('click', () => {
    $('.underline').removeClass('active');
    setTimeout(() => {
      $('.shuffle-memories').fadeIn(normalTime);
      $('.to-hide').fadeIn(500);
    }, normalTime);
    setTimeout(() => {
      $('#to-extend').show();
      $('#to-extend').css('transform', 'rotate(0deg)').removeClass('active');
    }, 1100);
    $('.tags, .tags li').fadeOut(normalTime);
  });
}

function openTagMenu() {
  $('.search-tags').on('click', () => {
    $('.underline').addClass('active');
    $('#to-extend').css('transform', 'rotate(-45deg)').addClass('active');
    $('.to-hide').hide();
    $('.shuffle-memories').fadeOut(normalTime);
    setTimeout(() => {
      $('#to-extend').hide();
    }, 900);
    setTimeout(() => {
      $('.tags, .tags li').fadeIn(normalTime);
      $('.tag-container').css('display', 'flex');
    }, normalTime);
  });
  tagSorting();
  clearButton();
  closeTagMenu();
  removingTags();
}

function showHeading(d){
setTimeout(() => {
  const sim = d3.forceSimulation()
    .force('forceX', d3.forceX().strength(0.5).x(d => d.x))
    .force('forceY', d3.forceY().strength(0.5).y(d => d.y))
    .force('center', d3.forceCenter(180, 320));

    const text = d3.selectAll(`#nodeGrp${d.id}`)
    .append('text')
      .text(d => d.heading)
      .attr('transform', `translate(-40, -25)`)
      .attr('fill', '#526173')
      .attr('class', 'memory-heading')
      .attr('font-family', 'quicksand')
      .attr('font-size', '0.9em')
      .call(d3.drag()
        .on('start', dragstart)
        .on('drag', dragging)
        .on('end', dragend));

  sim
  .nodes(d)
  .on('tick', () => {
    text
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  });

  function dragstart(d) {
    if (!d3.event.active) { sim.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragend(d) {
    if (!d3.event.active) sim.alphaTarget(0);
    if (!d.outer) {
      d.fx = null;
      d.fy = null;
      }
    }
  }, 1200);

}

function showDeleteButton(d) {
  setTimeout(() => {
    if ($('.memory').hasClass('active')) {
      $('.menu > *').fadeOut();
      $('.delete-button').fadeIn();
    }
  }, 1200);
}

function hoveringOnDelete() {
  $('.delete-button').on('mouseover', () => {
    $('.delete-button path').css('fill', '#FF3F56');
    $('.delete-button').addClass('deleting');
  });
  $('.delete-button').on('mouseleave', () => {
    $('.delete-button path').css('fill', 'white');
    $('.delete-button').removeClass('deleting');
  });
}

function hideDeleteButton() {
  $('.delete-button').fadeOut();
  $('.menu > *:not(.delete-button)').fadeIn();
}


function submitNewMemory() {
  $('.memory-input__submit').on('click', function() {
    $('.finished')
      .addClass('new-node');
    $('.finished svg')
      .hide();
    $('.memory-input')
      .addClass('hide');
    setTimeout(function () {
      $('.finished svg')
        .show();
      $('.finished')
        .removeClass('new-node finished wipe');
    }, 4500);
  });
}

module.exports = {
  binByKey,
  getRandomInt,
  openTagMenu,
  submitNewMemory,
  showDeleteButton,
  hoveringOnDelete,
  hideDeleteButton,
  showHeading,
};
