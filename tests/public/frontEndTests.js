// Add frontend tests here

const test = require('tape');

test('dummy test to get Travis running', (t) => {
  const num = 1 + 1;
  t.equal(num, 2, 'Should return 2');
  t.end();
});
