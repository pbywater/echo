const connect = require('./db_connect');

const get = {};

get.memories = (userId, callback) => {
  connect.query('SELECT memories.id, memories.heading, memories.likes, memories.avgRating, memories.visits, memories.tag, memories.memory FROM memories INNER JOIN users ON users.id = memories.user_id WHERE users.id = $1', [userId], (err, res) => {
    if (err) {
      return callback(err);
    }
    return callback(null, res); // will be refactored
  });
};

module.exports = get;
