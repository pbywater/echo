const connect = require('./db_connect');

const updateLikes = (likeNum, memoryId, cb) => {
  connect.query(
    'UPDATE memories SET likes = $1 WHERE memories.id = $2', [likeNum, memoryId], cb);
};

module.exports = {
  updateLikes,
};
