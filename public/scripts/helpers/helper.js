(function () {
  const self = {};

  // filters array for unique values
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  self.onlyUnique = onlyUnique;

  // generic function to find radial x and y using distance and angle
  function calculateXY(nodeList) {
    const objLength = Object.keys(nodeList).length;
    const angleIncrease = (2 * Math.PI) / objLength;
    let angle = angleIncrease;
    let i = 0;
    for (const keys in nodeList) {
      const distance = nodeList[keys].distance;
      if (i === 0) {
        nodeList[keys].xDistance = 0;
        nodeList[keys].yDistance = 0;
      }
      if (i === 1) {
        nodeList[keys].xDistance = 0;
        nodeList[keys].yDistance = distance;
      } else if (i > 0) {
        nodeList[keys].xDistance = Math.cos(angle) * distance;
        nodeList[keys].yDistance = Math.sin(angle) * distance;
      }
      i += 1;
      angle += angleIncrease;
    }
  }

  self.calculateXY = calculateXY;

  echo.helpers = self;
}());
