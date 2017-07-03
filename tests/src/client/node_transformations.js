const test = require('tape')

const { binByTag, sortWithMax } = require('../../../src/client/node_transformations.js')

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
