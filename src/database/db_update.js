const connect = require('./db_connect');

const updateLikes = (likeNum, memoryId, cb) => {
  connect.query(
    'UPDATE memories SET likes = $1 WHERE memories.id = $2', [likeNum, memoryId], cb);
};

const updateEmailVerification = (username, token, cb) => {
  connect.query(
    `UPDATE users
    SET verified = true
    WHERE users.username = $1
    AND users.token = $2`, [username, token], cb);
};

module.exports = {
  updateLikes,
  updateEmailVerification,
};
