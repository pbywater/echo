const connect = require('./db_connect');

const updateLikes = (likeNum, callback) => {
  connect.query(
    'UPDATE memories SET likes = $1', [likeNum], (err, res) => {
      if (err) {
        return callback(err);
      }
      return callback(null, res);
    });
};

module.exports = {
  updateLikes,
};
