const { binByKey, getRandomInt } = require('./helpers/helpers.js');

const binByTag = arrayToBin => binByKey('tag', arrayToBin);

const sortWithMax = (nodeArray) => {
  const nodesArrayCopy = nodeArray.slice(0);

  nodesArrayCopy.sort((a, b) => b.likes - a.likes);

  return {
    max: nodesArrayCopy[0],
    rest: nodesArrayCopy.slice(1),
  };
};

const centralMaxNodesByTag = (tagsArray, startingCx, startingCy) => {
  const out = {};
  const arrayCopy = tagsArray.slice(0);
  arrayCopy.forEach((tag, i) => {
    out[tag.max.tag] = {
      id: tag.max.id,
      heading: tag.max.heading,
      media_type: tag.max.media_type,
      memory_asset_url: tag.max.memory_asset_url || '',
      memory_text: tag.max.memory_text || '',
      x: startingCx + getRandomInt(-100, 100),
      y: startingCy + (getRandomInt(150, 250) * i),
      tag: tag.max.tag,
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

const getMemoryNodePositions = (tagNode, numTagMemories, memoryIndex, currentLikes) => {
  const angle = ((2 * Math.PI) / numTagMemories) * memoryIndex;
  // const distance = (tagNode.likes - currentLikes) * 2 || 50;
  const distance = tagNode.likes - currentLikes !== 0 ? (tagNode.likes - currentLikes) * 2 : 50;
  return getXAndY(angle, distance, tagNode.x, tagNode.y);
};

const memoryNodesAndLinks = (tagNodes, memoriesByTag) => {
  const nodes = {};
  const links = [];
  const sourceNodeIds = [];

  Object.keys(tagNodes).forEach((tag, index) => {
    sourceNodeIds.push(tagNodes[tag].id);
    const tagNode = tagNodes[tag];
    const tagMemoriesRest = memoriesByTag[index].rest;
    const numMemoriesRest = memoriesByTag[index].rest.length;
    nodes[tagNodes[tag].id] = tagNodes[tag];
    tagMemoriesRest.map((tagMemory, memoryIndex) => {
      const XAndY = getMemoryNodePositions(tagNode, numMemoriesRest, memoryIndex, tagMemory.likes);
      tagMemory.x = XAndY.x;
      tagMemory.y = XAndY.y;
      return tagMemory;
    }).forEach((memoryNode) => {
      nodes[memoryNode.id] = memoryNode;
      links.push({
        source: memoryNode.id,
        target: tagNode.id,
      });
    });
  });
  sourceNodeIds.forEach((id, i) => {
    if (i < sourceNodeIds.length - 1) {
      links.push({
        source: id,
        target: sourceNodeIds[i + 1],
      });
    }
  });

  return {
    nodes, links,
  };
};

module.exports = {
  binByTag,
  sortWithMax,
  centralMaxNodesByTag,
  getXAndY,
  getMemoryNodePositions,
  memoryNodesAndLinks,
};
