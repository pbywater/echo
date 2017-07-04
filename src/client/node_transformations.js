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
  const arrayCopy = tagsArray.slice(0);
  arrayCopy.forEach((tag, i) => {
    const newId = generateId();
    out[tag.max.tag] = {
      id: i,
      x: startingCx,
      y: startingCy + 200 * i,
      tag: tag.max.tag,
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
    x: nx,
    y: ny,
  };
};

const getMemoryNodePositions = (tagNode, numTagMemories, memoryIndex, currentAvgRating) => {
  const angle = ((2 * Math.PI) / numTagMemories) * memoryIndex;
  const distance = (tagNode.avgRating - currentAvgRating) * 15;
  return getXAndY(angle, distance, tagNode.x, tagNode.y);
};

const memoryNodesAndLinks = (tagNodes, memoriesByTag) => {
  const nodes = {};
  const links = [];

  Object.keys(tagNodes).forEach((tag, index) => {
    const tagNode = tagNodes[tag];
    const tagMemoriesRest = memoriesByTag[index].rest;
    const numMemoriesRest = memoriesByTag[index].rest.length;
    nodes[tagNodes[tag].id] = tagNodes[tag];
    const memoryNodes = tagMemoriesRest.map((tagMemory, memoryIndex) => {
      const XAndY = getMemoryNodePositions(tagNode, numMemoriesRest, memoryIndex, tagMemory.avgRating);
      tagMemory.x = XAndY.x;
      tagMemory.y = XAndY.y;
      return tagMemory;
    }).forEach((memoryNode) => {
      nodes[memoryNode.id] = memoryNode;
      links.push({
        source: memoryNode.id,
        target: tagNode.id,
      });
      nodes[tagNode] = tagNode;
    });
  });

  return {
    nodes, links,
  };
};

// To be removed when we use UUID?

let numGenerated = 0;

const generateId = () => () => {
  numGenerated += 1;
  return numGenerated;
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