// filters array for unique values
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// generic function to find radial x and y using distance and angle
const exampleData = {
  node1: {
    avgRating: 8.5,
    distance: 0,
  },
  node2: {
    avgRating: 7.4,
    distance: 10,
  },
  node3: {
    avgRating: 5.4,
    distance: 15,
  },
  node4: {
    avgRating: 3.2,
    distance: 20,
  },
  node5: {
    avgRating: 1.2,
    distance: 25,
  },
};

function calculateXY(nodeList) {
  const objLength = Object.keys(nodeList).length;
  const angleIncrease = 2 * Math.PI / objLength;
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
      // angle = (angle * Math.PI / 180) + angleIncrease;
    }
    i++;
    angle += angleIncrease;
  }
}
