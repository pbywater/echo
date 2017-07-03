// filters array for unique values
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// generic function to find radial x and y using distance and angle
function calculateXY(nodeList) {
  const objLength = Object.keys(nodeList).length;
  const angleIncrease = (2 * Math.PI) / objLength;
  for (const keys in nodeList) {
    nodeList[keys].forEach(function(n, i){
      const angle = angleIncrease * i;

      const distance = n.avgRating * 15;
      if (i === 0) {
        n.cy += distance;
      } else if (i > 0) {
        n.cx += Math.cos(angle) * distance;
        n.cy += Math.sin(angle) * distance;
      }
    });
  }
  return nodeList;
}

var binByKey = (key, xs) =>
  xs.reduce(function(binnedArray, elem) {
    var targetBin = binnedArray[elem[key]]
    if (targetBin === undefined) {
      binnedArray[elem[key]] = []
    }

    binnedArray[elem[key]].push(elem)

    return binnedArray
  }, {})

module.exports = {
  binByKey,
  calculateXY,
  onlyUnique
}
