const connect = require('./db_connect');

const getMemories = (userLogin, callback) => {
  const userSQLMemories =
  `SELECT memories.id, memories.heading, memories.likes, memories.visits,
  memories.tag, memories.memory_asset_url, memories.memory_text,
  memories.media_type
  FROM memories
  INNER JOIN users
  ON users.id = memories.user_id
  WHERE users.id = (SELECT users.id FROM users WHERE username = $1 OR email = $1)`;

  connect.query(userSQLMemories, [userLogin], callback);
};

const getLikes = (memoryId, callback) => {
  connect.query(
    'SELECT memories.likes FROM memories WHERE memories.id = $1', [memoryId], (err, res) => {
      if (err) {
        return callback(err);
      }
      return callback(null, res.rows[0].likes);
    });
};

const userSQL = 'SELECT * FROM users WHERE username = $1 OR email = $1';

const getUser = (input, callback) => {
  const unacceptableInput = /[ !#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

  if (unacceptableInput.test(input.login)
    || unacceptableInput.test(input.password)) {
    return callback(new Error('Enter a valid email address / username and password'));
  }

  connect.query(userSQL, [input.login], (err, user) => {
    if (err) {
      return callback(err);
    } else if (user.rows.length === 0) {
      return callback(new Error('This username does not exist'));
    }
    callback(null, user.rows[0]);
  });
};

module.exports = {
  getMemories,
  getLikes,
  getUser,
};
