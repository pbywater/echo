const connect = require('./db_connnect');

const post = {};

post.memory = (newMemory, callback) => {
  connect.query('INSERT INTO memories (user_id, heading, tag, memory) VALUES ((SELECT users.id FROM users WHERE users.username = $1), $2, $3, $4)', [newMemory.username, newMemory.heading, newMemory.tag, newMemory.memory], (err, res) => {
    if (err) { return callback(err); }
    callback(null, res);
  });

  // TODO: handle logic behind initial likes, avgRating and visits data.
};
