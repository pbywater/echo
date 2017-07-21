const connect = require('./db_connect');

const updateLikes = (likeNum, memoryId, cb) => {
  connect.query(
    'UPDATE memories SET likes = $1 WHERE memories.id = $2', [likeNum, memoryId], cb);
};

const updatePhotoMemory = (userId, tag, heading, id, cb) => {
  connect.query(
    `UPDATE memories
     SET tag = $2, heading = $3
     WHERE user_id = (SELECT users.id FROM users WHERE username = $1 OR email = $1)
     AND id = $4
     `,
     [userId, tag, heading, id], cb);
};

module.exports = {
  updateLikes,
  updatePhotoMemory,
};
