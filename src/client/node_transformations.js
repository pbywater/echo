const { binByKey } = require('./helpers/helpers.js');

const binByTag = arrayToBin => binByKey('tag', arrayToBin);


const sortWithMax = (nodeArray) => {
  const nodesArrayCopy = nodeArray.slice(0);

  nodesArrayCopy.sort((a, b) => b.avgrating - a.avgrating);

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
      media_type: tag.max.media_type,
      memory_asset_url: tag.max.memory_asset_url || '',
      memory_text: tag.max.memory_text || '',
      x: startingCx,
      y: startingCy + 200 * i,
      tag: tag.max.tag,
      avgrating: tag.max.avgrating,
      likes: tag.max.likes,
    };
    if (tag.max.new) {
      out[tag.max.tag].new = true;
    }
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

const getMemoryNodePositions = (tagNode, numTagMemories, memoryIndex, currentavgrating) => {
  const angle = ((2 * Math.PI) / numTagMemories) * memoryIndex;
  const distance = (tagNode.avgrating - currentavgrating) * 15;
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
      const XAndY = getMemoryNodePositions(tagNode, numMemoriesRest, memoryIndex, tagMemory.avgrating);
      tagMemory.x = XAndY.x;
      tagMemory.y = XAndY.y;
      return tagMemory;
    }).forEach((memoryNode) => {
      nodes[memoryNode.id] = memoryNode;
      const obj = {
        source: memoryNode.id,
        target: tagNode.id,
      };
      console.log(obj);
      links.push(obj);
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
