const connect = require('./db_connect');

const sqlQuery = 'DELETE FROM memories WHERE memories.id = $1;';

const deleteMemory = (memoryId, callback) => {
  connect.query(sqlQuery, [memoryId], (err) => {
    console.log('memoryid is ', memoryId);
    if (err) {
      console.log('err is ', err);
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  deleteMemory,
};
