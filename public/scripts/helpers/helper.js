//filters array for unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// generic function to find radial x and y using distance and angle
var exampleData = {
  node1: {
    avgRating: 8.5,
    distance: 0
  },
  node2: {
    avgRating: 7.4,
    distance: 10
  },
  node3: {
    avgRating: 5.4,
    distance: 15
  },
  node4: {
    avgRating: 3.2,
    distance: 20
  },
  node5: {
    avgRating: 1.2,
    distance: 25
  }
};

function calculateXY(nodeList) {
  var objLength = Object.keys(nodeList).length;
  const angleIncrease = 2 * Math.PI / objLength;
  console.log("angleIncrease", angleIncrease);
  let angle = angleIncrease;
  console.log("angle", angle);
  let i = 0;
  for (var keys in nodeList) {
    var distance = nodeList[keys].distance;
    console.log("distance", distance);
    if (i === 1) {
      nodeList[keys].xDistance = 0;
      nodeList[keys].yDistance = distance;
      console.log("if i == 1", nodeList[keys].yDistance);
    }
    else if (i > 0) {
      nodeList[keys].xDistance = Math.cos(angle) * distance;
      nodeList[keys].yDistance = Math.sin(angle) * distance;
      // angle = (angle * Math.PI / 180) + angleIncrease;
    }
    i++;
    angle += angleIncrease;
    console.log("xdist", nodeList[keys].xDistance);
    console.log("ydist", nodeList[keys].yDistance);
  }
}
