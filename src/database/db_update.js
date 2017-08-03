const connect = require('./db_connect');

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


const updateNotificationSubscription = (subscription, username, cb) => {
  connect.query(
    `UPDATE users
    SET notification_subscription = $1
    WHERE users.username = $2
    OR users.email = $2`, [subscription, username], cb);
}

module.exports = {
  updateLikes,
  updatePhotoMemory,
  updateEmailVerification,
  updateNotificationSubscription,
};
