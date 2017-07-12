const connect = require('./db_connect');

const getMemories = (userId, callback) => {
  connect.query(
    `SELECT memories.id, memories.heading, memories.likes, memories.visits, memories.tag, memories.memory_asset_url, memories.memory_text, memories.media_type
    FROM memories
    INNER JOIN users
    ON users.id = memories.user_id
    WHERE users.id = $1;`, [userId], (err, res) => {
      if (err) {
        return callback(err);
      }
      return callback(null, res); // will be refactored
    });
};

module.exports = {
  getMemories,
};
