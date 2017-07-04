const connect = require('./db_connect');

const hashPassword = request('./../helpers/hashPassword');

const post = {};

post.memory = (newMemory, callback) => {
  connect.query(
    `WITH new_memory AS (
      INSERT INTO memories
        (user_id, heading, tag, memory)
      VALUES
      ((SELECT users.id FROM users WHERE users.username = $1), $2, $3, $4)
      RETURNING id
    )
    UPDATE media SET
      ${newMemory.mediaType} = ${newMemory.mediaType} || (SELECT id FROM new_memory)`,
    [newMemory.username, newMemory.heading, newMemory.tag, newMemory.memory], (err, res) => {
      if (err) { callback(err); }
      callback(null, res);
    });
};

post.registerUser (userDetails, callback) => {
  connect.query(
    'SELECT username FROM users WHERE username = $1;', [userDetails.username], (err, res) => {
      if (err) { return callback(err); }

      if (!res.rows[0]) {
        hashPassword(userDetails.password, (err, hash) => {
          if (err) { return callback(err); }

          connect.query('INSERT INTO users (username, password, email) VALUES($1, $2, $3);', [userDetails.username, hash, userDetails.email], (err) => {
            if (err) { return callback(err); }
            callback(null, 'new user added');
          });
        })
      } else {
        callback(new Error('Sorry, that username is taken.'));
      }
    });
};

module.exports = post;
