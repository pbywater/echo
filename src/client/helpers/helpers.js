
const binByKey = (key, xs) =>
  xs.reduce((binnedArray, elem) => {
    const targetBin = binnedArray[elem[key]];
    if (targetBin === undefined) {
      binnedArray[elem[key]] = [];
    }

    binnedArray[elem[key]].push(elem);
    return binnedArray;
  }, {});

function tagSorting() {
  $('.tagLabel').on('click', function () {
    $('.memory').show();
    let clickedTag = $(this).text();
    clickedTag = clickedTag.replace(/\s+/g, '');
    $('.tagLabel').each(function () {
      const tagLabel = $(this).text().replace(/\s+/g, '');
      if (tagLabel !== clickedTag) {
        $(this).parent().hide();
      }
    });
    if (!$(this).hasClass('close-tags')) {
      $('.memory').each(function () {
        if (!$(this).hasClass(clickedTag)) {
          $(this).hide();
        }
      });
    }
  });
  $('.clear-tags').on('click', () => {
    $('.memory').show();
    $('.tag-container').show();
  });
}

function removingTags() {
  $('.filter-tags').on('click', function () {
    $(this).parent().hide();
  });
}

function searchButton() {
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

module.exports = {
  binByKey,
  tagSorting,
  searchButton,
  removingTags,
};
