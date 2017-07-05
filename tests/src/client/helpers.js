const fs = require('fs')
const path = require('path')

const getMockNodes = () => JSON.parse(fs.readFileSync(
  path.join(__dirname, 'mock_nodes.json'),
  'utf8'
))

module.exports = {
  getMockNodes
}
