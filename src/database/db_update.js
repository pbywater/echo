const connect = require('./db_connect');

const updateLikes = (likeNum, memoryId) => {
  connect.query(
    'UPDATE memories SET likes = $1 WHERE memories.id = $2', [likeNum, memoryId], (err, res) => {
      if (err) {
        return err;
      }
      return (null, res);
    });
};

module.exports = {
  updateLikes,
};
