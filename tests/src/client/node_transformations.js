/* eslint-disable */
const test = require('tape');

const {
  binByTag,
  sortWithMax,
  tagNodesByTag,
  getXAndY,
  getMemoryNodePositions,
  generateId,
  memoryNodesAndLinks,
} = require('../../../src/client/node_transformations.js');

test('binByTag', (t) => { // WORKING
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

test('sortWithMax', (t) => { // WORKING
  const nodesToSort = [
    { avgRating: 3 },
    { avgRating: 1 },
    { avgRating: 2 },
  ];

  const expected = {
    max: { avgRating: 3 },
    rest: [
      { avgRating: 1 },
      { avgRating: 2 },
    ],
  };

  t.deepEqual(
    sortWithMax(nodesToSort),
    expected,
    'returns correct { max, rest: [nodes]} '
  );

  t.end();
});

test('tagNodesByTag', (t) => { // WORKING
    const arrayCopy = [
      {
        max: {
          avgrating: 9.2,
          heading: 'hello',
          id: 1,
          likes: 19,
          media_type: "audio",
          memory_asset_url: "www.google.com",
          memory_text: 'memory',
          tag: "family",
          visits: 1,
        },
        rest: [
          {
            avgrating: 8.2,
            heading: 'hello',
            id: 2,
            likes: 18,
            tag: "family",
            media_type: "image",
            memory_asset_url: "www.google.com",
            memory_text: 'memory',
            tag: "family",
            visits: 1,
          },
        ]
      },
      {
        max: {
          avgrating: 9.2,
          heading: 'help',
          id: 3,
          likes: 19,
          media_type: "image",
          memory_asset_url: "www.google.com",
          memory_text: 'memory',
          tag: "friends",
          visits: 2,
        },
        rest: [
          {
            avgrating: 8.2,
            heading: 'memory',
            id: 4,
            likes: 18,
            media_type: "image",
            memory_asset_url: "www.google.com",
            memory_text: 'memory',
            tag: "friends",
            visits: 2,
          },
        ]
      },
      {
        max: {
          avgrating: 9.2,
          id: 5,
          likes: 19,
          media_type: "image",
          memory_asset_url: "www.google.com",
          memory_text: 'memory',
          tag: "pets",
          visits: 1,
        },
        rest: [
          {
            avgrating: 8.2,
            id: 6,
            likes: 18,
            media_type: "image",
            memory_asset_url: "www.google.com",
            memory_text: 'memory',
            tag: "pets",
            visits: 3,
          },
        ]
      }
    ];

  const startingCx = 160;
  const startingCy = 120;

  const expected = {
    family:
        { avgrating: 9.2,
          id: 1,
          likes: 19,
          media_type: "audio",
          memory_asset_url: 'www.google.com',
          memory_text: 'memory',
          tag: 'family',
          x: 160,
          y: 120 },
    friends:
        { avgrating: 9.2,
          id: 3,
          likes: 19,
          media_type: "image",
          memory_asset_url: 'www.google.com',
          memory_text: 'memory',
          tag: 'friends',
          x: 160,
          y: 320 },
    pets:
        { avgrating: 9.2,
          id: 5,
          likes: 19,
          media_type: "image",
          memory_asset_url: 'www.google.com',
          memory_text: 'memory',
          tag: 'pets',
          x: 160,
          y: 520 }
        };

  t.deepEqual(
    tagNodesByTag(arrayCopy, startingCx, startingCy, generateId),
    expected,
    'creates map of tag nodes, with ids and positions'
  );

  t.end();
});

test('memoryNodesAndLinks', (t) => {
  const memoriesByTag = {
    family:
        { avgRating: 9.2,
          id: 0,
          likes: 19,
          tag: 'family',
          x: 160,
          y: 120 },
    friends:
        { avgRating: 9.2,
          id: 1,
          likes: 19,
          tag: 'friends',
          x: 160,
          y: 320 },
    pets:
        { avgRating: 9.2,
          id: 2,
          likes: 19,
          tag: 'pets',
          x: 160,
          y: 520 }
        };

  const startingCx = 160;
  const startingCy = 120;

  const tagNodes = [
    {
      max: {
        avgRating: 9.2,
        id: 65465432,
        likes: 19,
        tag: "family",
      },
      rest: [
        {
          avgRating: 8.2,
          id: 456535,
          likes: 18,
          tag: "family",
        },
      ]
    },
    {
      max: {
        avgRating: 9.2,
        id: 65465432,
        likes: 19,
        tag: "friends",
      },
      rest: [
        {
          avgRating: 8.2,
          id: 67456535,
          likes: 18,
          tag: "friends",
        },
      ]
    },
    {
      max: {
        avgRating: 9.2,
        id: 65465432,
        likes: 19,
        tag: "pets",
      },
      rest: [
        {
          avgRating: 8.2,
          id: 65,
          likes: 18,
          tag: "pets",
        },
      ]
    }
  ];

  const expectedLinks = [
    { source: 456535, target: 0 },
    { source: 67456535, target: 1 },
    { source: 65, target: 2 },
    { source: 0, target: 1 },
    { source: 1, target: 2 }
  ];

  const { nodes, links } = memoryNodesAndLinks(memoriesByTag, tagNodes);

  t.deepEqual(
    links,
    expectedLinks,
    'correct links created'
  );

  const nodesArray = Object.keys(nodes).map(nodeId => nodes[nodeId]);

  t.ok(
    nodesArray.every(node => node.x !== undefined),
    'all nodes have cx value'
  );
  t.ok(
    nodesArray.every(node => node.y !== undefined),
    'all nodes have cy value'
  );

  t.end();
});

test('get the x and y coordinates', (t) => {
  const angle = ((2 * Math.PI) / 4) * 3;
  const distance = 25.5;
  const startingCx = 160;
  const startingCy = 120;
  const expected = { x: 160, y: 94.5 };

  t.deepEqual(getXAndY(angle, distance, startingCx, startingCy), expected, 'found x and y axis');
     t.end();
});

test('getMemoryNodePositions', (t) => {
  const tagNode = {
    avgrating: 6,
    id: 4,
    index: 3,
    likes: 35,
    media_type: 'video',
    memory_asset_url: 'test',
    memory_text: 'testmem',
    tag: 'friends',
    x: 160,
    y: 120,
  };

  const numTagMemories = 4;
  const memoryIndex = 3;
  const currentAvgRating = 7;

  const expected = { x: 160, y: 135 };

t.deepEqual(
  getMemoryNodePositions(tagNode, numTagMemories, memoryIndex, currentAvgRating),
  expected,
  'correct node position found'
);
   t.end();

});
