
const binByKey = (key, xs) =>
  xs.reduce((binnedArray, elem) => {
    const targetBin = binnedArray[elem[key]];
    if (targetBin === undefined) {
      binnedArray[elem[key]] = [];
    }

    binnedArray[elem[key]].push(elem);
    return binnedArray;
  }, {});

module.exports = {
  binByKey,
};
