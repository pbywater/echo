const connect = require('./db_connect');
const hashPassword = require('./../helpers/hashPassword');

const updateLikes = (likeNum, memoryId, cb) => {
  connect.query(
    'UPDATE memories SET likes = $1 WHERE memories.id = $2', [likeNum, memoryId], cb);
};

const updatePhotoMemory = (userId, tag, heading, id, cb) => {
  connect.query(
    `UPDATE memories
     SET tag = $2, heading = $3
     WHERE user_id = $1 AND id = $4
     `,
     [userId, tag, heading, id], cb);
};

const updateEmailVerification = (username, token, cb) => {
  connect.query(
    `UPDATE users
    SET verified = true
    WHERE users.username = $1
    AND users.token = $2`, [username, token], cb);
};

const updatePasswordToken = (email, token, cb) => {
  connect.query(
    `UPDATE users
    SET passwordtoken = $2
    WHERE email = $1`, [email, token], cb);
};

const updatePassword = (username, password, passwordToken, cb) => {
  hashPassword(password, (err, hash) => {
    if (err) { return cb(new Error('Sorry, there was an internal error.')); }

    connect.query(
      `UPDATE users
      SET password = $2, passwordtoken = $4
      WHERE username = $1
      AND passwordtoken = $3`, [username, hash, passwordToken, ''], cb);
  });
};

module.exports = {
  updateLikes,
  updatePhotoMemory,
  updateEmailVerification,
  updatePasswordToken,
  updatePassword,
};
