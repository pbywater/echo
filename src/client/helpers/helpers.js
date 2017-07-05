// filters array for unique values
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// generic function to find radial x and y using distance and angle
function calculateXY(nodeList) {
  const objLength = Object.keys(nodeList).length;
  const angleIncrease = (2 * Math.PI) / objLength;
  for (const keys in nodeList) {
    nodeList[keys].forEach((n, i) => {
      const angle = angleIncrease * i;

      const distance = n.avgRating * 15;
      if (i === 0) {
        n.y += distance;
      } else if (i > 0) {
        n.x += Math.cos(angle) * distance;
        n.y += Math.sin(angle) * distance;
      }
    });
  }
  return nodeList;
}

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

module.exports = {
  binByKey,
  calculateXY,
  onlyUnique,
  getRandomInt,
};
