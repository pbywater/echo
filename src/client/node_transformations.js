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

module.exports = {
  binByTag,
  sortWithMax,
  tagNodesByTag
}
