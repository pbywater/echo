/* eslint-disable */
const test = require('tape');

const {
  binByTag,
  sortWithMax,
  centralMaxNodesByTag,
  getXAndY,
  getMemoryNodePositions,
  generateId,
  memoryNodesAndLinks,
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

test('centralMaxNodesByTag', (t) => {
    const arrayCopy = [
      {
        max: {
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

  const centralTags = centralMaxNodesByTag(arrayCopy, 160, 120)

  for (var key in centralTags){
    t.ok(centralTags[key].x !== undefined, 'all central tags have x coordinate');

    t.ok(centralTags[key].y !== undefined, 'all central tags have y coordinate');
  }

  t.end();
});

test('memoryNodesAndLinks', (t) => {
  const memoriesByTag = {
    family:
        { id: 0,
          likes: 19,
          tag: 'family',
          x: 160,
          y: 120 },
    friends:
        { id: 1,
          likes: 19,
          tag: 'friends',
          x: 160,
          y: 320 },
    pets:
        { id: 2,
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
        id: 65465432,
        likes: 19,
        tag: "family",
      },
      rest: [
        {
          id: 456535,
          likes: 18,
          tag: "family",
        },
      ]
    },
    {
      max: {
        id: 65465432,
        likes: 19,
        tag: "friends",
      },
      rest: [
        {
          id: 67456535,
          likes: 18,
          tag: "friends",
        },
      ]
    },
    {
      max: {
        id: 65465432,
        likes: 19,
        tag: "pets",
      },
      rest: [
        {
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

  const expected = { x: 160, y: 64 };

t.deepEqual(
  getMemoryNodePositions(tagNode, numTagMemories, memoryIndex, currentAvgRating),
  expected,
  'correct node position found'
);
   t.end();

});
