const { binByKey } = require('./helpers/helpers.js');

const binByTag = arrayToBin => binByKey('tag', arrayToBin);


const sortWithMax = (nodeArray) => {
  const nodesArrayCopy = nodeArray.slice(0);

  nodesArrayCopy.sort((a, b) => b.avgRating - a.avgRating);

  return {
    max: nodesArrayCopy[0],
    rest: nodesArrayCopy.slice(1),
  };
};

const tagNodesByTag = (tagsArray, startingCx, startingCy, generateId) => {
  const out = {};

  tagsArray.forEach((tag, i) => {
    const newId = generateId();
    out[tag] = {
      id: newId,
      cx: startingCx,
      cy: startingCy + 200 * i,
      tag,
      avgRating: tag.max.avgRating,
      likes: tag.max.likes,
    };
  });

  return out;
};

const getXAndY = (angle, distance, startingCx, startingCy) => {
  const nx = startingCx + Math.cos(angle) * distance;
  const ny = startingCy + Math.sin(angle) * distance;
  return {
    cx: nx,
    cy: ny,
  };
};

const getMemoryNodePositions = (tagNode, numTagMemories, memoryIndex, currentAvgRating) => {
  const angle = ((2 * Math.PI) / numTagMemories) * memoryIndex;
  const distance = (tagNode.avgRating - currentAvgRating) * 15;
  return getXAndY(angle, distance, tagNode.cx, tagNode.cy);
};

const memoryNodesAndLinks = (tagNodes, memoriesByTag) => {
  const nodes = {};
  const links = [];

  Object.keys(tagNodes).forEach((tag, index) => {
    const tagNode = tagNodes[tag];
    const tagMemories = memoriesByTag[index].rest;
    const numMemories = memoriesByTag[index].rest.length;
    const memoryNodes = tagMemories.map((tagMemory, memoryIndex) => {
      const XAndY = getMemoryNodePositions(tagNode, numMemories, memoryIndex, tagMemory.avgRating);
      tagMemory.cx = XAndY.cx;
      tagMemory.cy = XAndY.cy;
      return tagMemory;
      // [{ cx, cy, id, tag}]
    }).forEach((memoryNode) => {
      nodes[memoryNode.id] = memoryNode;
      links.push({
        source: memoryNode.id,
        target: tagNode.id,
      });
      nodes[tagNode] = tagNode;
    });

    // .forEach((memoryNode) => {
    //   console.log('memoryNode is ', memoryNode);
    //   links.push({
    //     source: memoryNode.id,
    //     target: tagNode.id,
    //   });
    // });
  });

  return {
    nodes, links,
  };
};

const generateId = () => {
  let numGenerated = 0;
  return () => {
    numGenerated += 1;
    return numGenerated;
  };
};


module.exports = {
  binByTag,
  sortWithMax,
  tagNodesByTag,
  getXAndY,
  getMemoryNodePositions,
  memoryNodesAndLinks,
  generateId,
};
