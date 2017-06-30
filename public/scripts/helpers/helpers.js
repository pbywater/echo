(function () {
  const self = {};

  // filters array for unique values
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  self.onlyUnique = onlyUnique;

  // generic function to find radial x and y using distance and angle
  function calculateXY(nodeList) {
    const objLength = Object.keys(nodeList).length + 1;
    const angleIncrease = (2 * Math.PI) / objLength;
    for (const keys in nodeList) {
      nodeList[keys].forEach(function(n, i){
        const angle = angleIncrease * i;

        const distance = n.avgRating * 30;
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

  self.calculateXY = calculateXY;

  var binByKey = function(key, xs) {
    var tagMap = xs.reduce(function(binnedArray, elem) {
      var targetBin = binnedArray[elem[key]]
      if (targetBin === undefined) {
        binnedArray[elem[key]] = []
      }

      binnedArray[elem[key]].push(elem)

      return binnedArray
    }, {})

    // { 'cat': [{}, {}]}

    // ['cat', 'dog']
    // [{tag: 'cat', nodes: [{}, {}]}, {tag: 'cat'}]
    return Object.keys(tagMap).map(function(tag) {
      return { tag: tag, nodes: tagMap[tag] }
    })
  }
  self.binByKey = binByKey

  echo.helpers = self;
}());
