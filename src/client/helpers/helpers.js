
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
  $('.tags li').on('click', function () {
    $('.memory').show();
    const clickedTag = $(this).text();
    $('.memory').each(function () {
      if (!$(this).hasClass(clickedTag)) {
        $(this).hide();
      }
    });
  });
  $('.remove').on('click', () => {
    $('.memory').show();
  });
}

module.exports = {
  binByKey,
  calculateXY,
  tagSorting,
};
