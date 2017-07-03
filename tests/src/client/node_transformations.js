const test = require('tape')

const {
  binByTag,
  sortWithMax,
  tagNodesByTag
} = require('../../../src/client/node_transformations.js')

test('binByTag', t => {
  const arrayToBin = [
    { tag: 't1', value: 1 },
    { tag: 't1', value: 2 },
    { tag: 't2', value: 3 }
  ]

  const expected = {
    't1': [{ tag: 't1', value: 1 }, { tag: 't1', value: 2 }],
    't2': [{ tag: 't2', value: 3 }]
  }

  t.deepEqual(
    binByTag(arrayToBin),
    expected,
    'returns a map of tagName:[nodeArray]'
  )

  t.end()
})

test('sortWithMax', t => {
  const nodesToSort = [
    { avgRating: 3 },
    { avgRating: 1 },
    { avgRating: 2 }
  ]

  const expected = {
    max: { avgRating: 3 },
    rest: [
      { avgRating: 2 },
      { avgRating: 1 }
    ]
  }

  t.deepEqual(
    sortWithMax(nodesToSort),
    expected,
    'returns correct { max, rest: [nodes]} '
  )

  t.end()
})

test('tagNodesByTag', t => {
  const tagsArray = ['friends', 'family', 'pets'];
  const startingCx = 160;
  const startingCy = 120;

  const generateId = (() => {
    let numGenerated = 0
    return () => {
      numGenerated += 1
      return numGenerated
    }
  })()

  const expected = {
    friends: {
      id: 1,
      cx: startingCx,
      cy: startingCy,
      tag: 'friends'
    },
    family: {
      id: 2,
      cx: startingCx,
      cy: startingCy + 200,
      tag: 'family'
    },
    pets: {
      id: 3,
      cx: startingCx,
      cy: startingCy + 200 * 2,
      tag: 'pets'
    }
  }

  t.deepEqual(
    tagNodesByTag(tagsArray, startingCx, startingCy, generateId),
    expected,
    'creates map of tag nodes, with ids and positions'
  )

  t.end()
})
