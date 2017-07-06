
const binByKey = (key, xs) =>
  xs.reduce((binnedArray, elem) => {
    const targetBin = binnedArray[elem[key]];
    if (targetBin === undefined) {
      binnedArray[elem[key]] = [];
    }

    binnedArray[elem[key]].push(elem);
    return binnedArray;
  }, {});


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
      $('.shuffle-memories').fadeIn(1000);
      $('.to-hide').fadeIn(500);
    }, 1000);
    setTimeout(() => {
      $('#to-extend').show();
      $('#to-extend').css('transform', 'rotate(0deg)').removeClass('active');
    }, 1100);
    $('.tags, .tags li').fadeOut(1000);
  });
}

function openTagMenu() {
  $('.search-tags').on('click', () => {
    $('.underline').addClass('active');
    $('#to-extend').css('transform', 'rotate(-45deg)').addClass('active');
    $('.to-hide').hide();
    $('.shuffle-memories').fadeOut(1000);
    setTimeout(() => {
      $('#to-extend').hide();
    }, 900);
    setTimeout(() => {
      $('.tags, .tags li').fadeIn(1000);
      $('.tag-container').css('display', 'flex');
    }, 1000);
  });
  tagSorting();
  clearButton();
  closeTagMenu();
  removingTags();
}

module.exports = {
  binByKey,
  openTagMenu,
};
