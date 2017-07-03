const { binByKey } = require('./helpers/helpers.js')

const binByTag = arrayToBin => binByKey('tag', arrayToBin)

const sortWithMax = nodeArray => {
  const nodesArrayCopy = nodeArray.slice(0)

  nodesArrayCopy.sort((a, b) =>  b.avgRating - a.avgRating);

  return {
    max: nodesArrayCopy[0],
    rest: nodesArrayCopy.slice(1)
  }
}

const tagNodesByTag = (tagsArray, startingCx, startingCy, generateId) => {
    const out = {};

    tagsArray.forEach((tag, i) => {
      out[tag] = {
        id: generateId(),
        cx: startingCx,
        cy: startingCy + 200 * i,
        tag: tag
      }
    })

    return out;

}

const getMemoryNodePositions = (tagNode, numTagMemories, memoryIndex) => {
  // some trig

  return {
    cx,
    xy
  }
}

const memoryNodesAndLinks = (tagNodes, memoriesByTag) => {
  const nodes = {}
  const links = []

  Object.keys(tagNodes).forEach(tag => {
    const tagNode = tagNodes[tag]
    const tagMemories = memoriesByTag[tag]

    const memoryNodes = tagMemories.map(tagMemory => {
      // [{ cx, cy, id, tag}]
    }).forEach(memoryNode => {
      nodes[memoryNode.id] = memoryNode
    }).forEach(memoryNode => {
      links.push({
        source: memoryNode.id,
        target: tagNode.id
      })
    })
    nodes.push(tagNode)
  })

  return {
    nodes, links
  }
}

module.exports = {
  binByTag,
  sortWithMax,
  tagNodesByTag
}
