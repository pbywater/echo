/* eslint-disable */

const test = require('tape');

const {
  binByTag,
  sortWithMax,
  tagNodesByTag,
  getXAndY,
} = require('../../../src/client/node_transformations.js');

test('binByTag', (t) => {
  const arrayToBin = [
    { tag: 't1', value: 1 },
    { tag: 't1', value: 2 },
    { tag: 't2', value: 3 },
  ];

  const expected = {
    t1: [{ tag: 't1', value: 1 }, { tag: 't1', value: 2 }],
    t2: [{ tag: 't2', value: 3 }],
  };

  t.deepEqual(
    binByTag(arrayToBin),
    expected,
    'returns a map of tagName:[nodeArray]'
  );

  t.end();
});

test('sortWithMax', (t) => {
  const nodesToSort = [
    { avgRating: 3 },
    { avgRating: 1 },
    { avgRating: 2 },
  ];

  const expected = {
    max: { avgRating: 3 },
    rest: [
      { avgRating: 2 },
      { avgRating: 1 },
    ],
  };

  t.deepEqual(
    sortWithMax(nodesToSort),
    expected,
    'returns correct { max, rest: [nodes]} '
  );

  t.end();
});

test('tagNodesByTag', (t) => {
  const tagsArray = ['friends', 'family', 'pets'];
  const startingCx = 160;
  const startingCy = 120;

  const generateId = (() => {
    let numGenerated = 0;
    return () => {
      numGenerated += 1;
      return numGenerated;
    };
  })();

  const expected = {
    friends: {
      id: 1,
      cx: startingCx,
      cy: startingCy,
      tag: 'friends',
    },
    family: {
      id: 2,
      cx: startingCx,
      cy: startingCy + 200,
      tag: 'family',
    },
    pets: {
      id: 3,
      cx: startingCx,
      cy: startingCy + 200 * 2,
      tag: 'pets',
    },
  };

  t.deepEqual(
    tagNodesByTag(tagsArray, startingCx, startingCy, generateId),
    expected,
    'creates map of tag nodes, with ids and positions'
  );

  t.end();
});

// test('memoryNodesAndLinks', (t) => {
//   const memoriesByTag = {
//     friends: [{ tag: 'friends', id: 1 }, { tag: 'friends', id: 2 }],
//     family: [{ tag: 'family', id: 3 }],
//   };
//
//   const tagNodes = {
//     friends: {
//       id: 4,
//       cx: startingCx,
//       cy: startingCy,
//       tag: 'friends',
//     },
//     family: {
//       id: 5,
//       cx: startingCx,
//       cy: startingCy + 200,
//       tag: 'family',
//     },
//   };
//
//   const expectedLinks = [
//     { source: 4, target: 1 },
//     { source: 4, target: 2 },
//     { source: 5, target: 3 },
//   ];
//
//   const { nodes, links } = memoryNodesAndLinks(memoriesByTag, tagNodes);
//
//   t.deepEqual(
//     links,
//     expectedLinks,
//     'correct links created'
//   );

//   const nodesArray = Object.keys(nodes).map(nodeId => nodes[nodeId]);
//
//   t.okay(
//     nodesArray.every(node => node.cx !== undefined),
//     'all nodes have cx value'
//   );
//   t.okay(
//     nodesArray.every(node => node.cy !== undefined),
//     'all nodes have cy value'
//   );
//
//   t.end();
// });

test('get the x and y coordinates', (t) => {
  const angle = ((2 * Math.PI) / 4) * 3;
  const distance = 25.5;
  const startingCx = 160;
  const startingCy = 120;
  const expected = { cx: 160, cy: 94.5 };

  t.deepEqual(getXAndY(angle, distance, startingCx, startingCy), expected, 'found x and y axis');
});

// test('getMemoryNodePositions', (t) => {
//   const tagNode = {
//     id: 4,
//     cx: 160,
//     cy: 120,
//     avgRating: 8.7,
//     tag: 'friends',
//   };
//
//   const numTagMemories = 4;
//
//   const memoryIndex = 3;
//
//   const currentAvgRating = 7;
//
// const expected = {cx: , cy: }
//
// t.deepEqual(
//   getMemoryNodePositions(tagNode, numTagMemories, memoryIndex, currentAvgRating),
//   expected,
//   'correct node position found'
// );
//
// });
