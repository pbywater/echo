const connect = require('./db_connect');

const sqlQuery = 'DELETE FROM memories WHERE user_id = $1 AND id = $2;';

const deleteMemory = (userId, memoryId, callback) => {
  connect.query(sqlQuery, [userId, memoryId], (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  deleteMemory,
};
