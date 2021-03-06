/* eslint-disable */
const { sortWithMax, binByTag, centralMaxNodesByTag, binByKey, getRandomInt } = require('../node_transformations');
const normalTime = 1000;
const { animationDuration } = require('./../d3/setup');

function showTaggedMemory(memoryToShow) {
    $('.memory').each(function() {
        if ($(this).hasClass(memoryToShow)) {
            $(this).show();
        }
    });
}

function showMemoriesByActiveTags() {
    $('.memory').hide();
    $('.tagLabel').each(function() {
        if ($(this).is(':visible')) {
            const tag = $(this).text();
            showTaggedMemory(tag);
        }
    });
}

function hideOtherTags(tagToKeep) {
    $('.tagLabel').each(function() {
        const tagLabel = $(this).text().replace(/\s+/g, '');
        if (tagLabel !== tagToKeep) {
            $(this).parent().hide();
        }
    });
}

function hideOtherMemories(memoryTagToKeep) {
    $('.memory').each(function() {
        if (!$(this).hasClass(memoryTagToKeep)) {
            $(this).hide();
        }
    });
}

function tagSorting() {
    $('.tagLabel').on('click', function() {
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
    $('.filter-tags').on('click', function() {
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

function initTagMenu() {
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
        .attr('fill', 'white')
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

function hoveringOnDelete(nodeTop, buttonTop) {
  if ($('.delete-button').is(':visible')) {
  if (nodeTop >= buttonTop || buttonTop - 40 <= nodeTop) {
        $('.delete-button path').css('fill', '#FF3F56');
        $('.delete-button').addClass('deleting');
}
  else {
        $('.delete-button path').css('fill', 'white');
        $('.delete-button').removeClass('deleting');
  }
}
}

function hoveringOnDeleteSafari(nodeTop, buttonTop) {
  if ($('.delete-button').is(':visible')) {
  if (nodeTop + 40 >= buttonTop) {
        $('.delete-button path').css('fill', '#FF3F56');
        $('.delete-button').addClass('deleting');
}
  else {
        $('.delete-button path').css('fill', 'white');
        $('.delete-button').removeClass('deleting');
  }
}
}

function hideDeleteButton() {
    $('.delete-button').fadeOut();
    $('.menu > *:not(.delete-button)').fadeIn();
}


function initSubmitMemory() {
    $('.memory-input__submit')
        .on('click', function() {
            $('.finished')
                .addClass('new-node');
            $('.finished svg')
                .hide();
            $('.memory-input')
                .addClass('hide');
            $('.menu_icon')
                .removeClass('hide');
            $('.close_icon')
                .addClass('hide');
            $('#add-text-form')
                .trigger('reset');
            setTimeout(function() {
                $('.menu-item')
                    .show();
                $('.menu-open')
                    .prop('checked', false);
                $('.finished svg')
                    .show();
                $('.finished')
                    .removeClass('new-node finished wipe');
            }, animationDuration);
        })
        .submit((e) => {
            e.preventDefault();
        })
}

function constructTagList(data) {
  // binByTag sorts data by tag
  // e.g. {family: Array(5), pets: Array(5), friends: Array(5)}
  const binnedByTag = binByTag(data);
  // sortedWithMax sorts each tag group to separate max memory (by likes) from others in its group
  const sortedWithMax = [];
  Object.keys(binnedByTag).forEach((tagKey) => {
    sortedWithMax.push(sortWithMax(binnedByTag[tagKey]));
  });
// taggedNodesByTag returns an object with the cx and cy for the central node within each tag group
  const centralNodesByTag = centralMaxNodesByTag(sortedWithMax, 160, 120);
    Object.keys(centralNodesByTag).forEach((tag) => {
        tag = tag.replace(/\W/g, '');
        $('.tags').append(
            `<li class='tag-container ${tag}'>
      <p class='tagLabel'>${tag}</p>
      <img class='filter-tags ${tag}' src="./assets/icons/navigate/close_icon.svg"/>
    </li>`);
    });

    $('.tags').append(
        `<li class='clear-tags'>clear</li>
  <li class='close-tags'>
    <img class='close-icon' src="./assets/icons/navigate/close_icon.svg">
    </img>
  </li>`);
}

function storePendingActions(storedName, newObjToSave, itemToPush) {
  if (localStorage.getItem(storedName) !== null) {
    const itemsWaiting = JSON.parse(localStorage.getItem(storedName));
    itemsWaiting.memories.push(itemToPush);
    const itemsWaitingWithNewItem = JSON.stringify(itemsWaiting);
    localStorage[storedName] = itemsWaitingWithNewItem;
  }
  else {
    const saveObj = JSON.stringify(newObjToSave);
    localStorage[storedName] = saveObj;
  }
}

function removeMemoryFromStoredData(id) {
  const offlineData = JSON.parse(localStorage.getItem('data'));
  offlineData.forEach((memory, index) => {
    if (memory.id == id) {
      offlineData.splice(index, 1);
    }
  });
  const offlineDataAfterRemoving = JSON.stringify(offlineData);
  localStorage.setItem('data', offlineDataAfterRemoving);
  return offlineData;
}

function addMemoryToStoredData(id, heading, text, tag) {
  const offlineData = JSON.parse(localStorage.getItem('data'));
    const toAdd = {heading, id, likes: 0, media_type: "text_only", memory_text: text, tag, visits:0, memory_asset_url:''};
  offlineData.push(toAdd);
  const offlineDataAfterAdding = JSON.stringify(offlineData);
  localStorage.setItem('data', offlineDataAfterAdding);
return offlineData;
}

function clearPendingActions(storedName, index) {
  const memoriesWaitingToBeRemoved = JSON.parse(localStorage.getItem(storedName));
  if (memoriesWaitingToBeRemoved.memories.length === 1) {
    localStorage.removeItem(storedName);
  }
  else {
    memoriesWaitingToBeRemoved.memories.splice(index, 1);
    const memoriesStillToDelete = JSON.stringify(memoriesWaitingToBeRemoved);
    localStorage.setItem('toDelete', memoriesStillToDelete);
}
}

function processPendingMemories(cb) {
  if(localStorage.getItem('toDelete') !== null) {
  const deletedMemories = JSON.parse(localStorage.getItem('toDelete'));
  deletedMemories.memories.forEach((memory, index) => {
    memory = parseInt(memory);
    $.ajax({
      method: 'DELETE',
      url: 'memories',
      data: { id: memory },
      success: () => clearPendingActions('toDelete', index),
    });
    cb();
  })
}
if(localStorage.getItem('textToAdd') !== null) {
  const newTextMemories = JSON.parse(localStorage.getItem('textToAdd'));
  newTextMemories.memories.forEach((memory, index) => {
    const text = memory.text;
    const heading = memory.heading;
    const tag = memory.tag;
    $.ajax({
      method: 'POST',
      url: 'memory-input-text',
      data: {memory_text: text, heading, tag},
      success: () => clearPendingActions('textToAdd', index),
      });
  cb();
})
}
}

function updateOfflineLikes(cb) {
  if(localStorage.getItem('memoryLikes') !== null) {
  const newLikes = JSON.parse(localStorage.getItem('memoryLikes'));
  newLikes.memories.forEach((memory, index) => {
    const id = parseInt(memory.memoryId);
    const newLikeNum = parseInt(memory.newLikeNum);
    $.ajax({
      type: 'POST',
      url: '/likes',
      data: { numLikes: newLikeNum, memoryId: id },
      success: () => clearPendingActions('memoryLikes', index),
    });
    cb();
  })
}
}

module.exports = {
    initTagMenu,
    initSubmitMemory,
    showDeleteButton,
    hoveringOnDelete,
    hideDeleteButton,
    showHeading,
    constructTagList,
    storePendingActions,
    updateOfflineLikes,
    hoveringOnDeleteSafari,
    processPendingMemories,
    removeMemoryFromStoredData,
    addMemoryToStoredData,
};
