const connect = require('./db_connect');

const deleteMemory = (memoryId, callback) => {
  connect.query(
    `DELETE FROM memories
    WHERE memories.id = $1;`, [memoryId], (err) => {
      if (err) {
        return callback(err);
      }
    }
  )
}

module.exports = {
  deleteMemory
}
