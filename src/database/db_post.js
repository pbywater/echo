const connect = require('./db_connect');

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
      if (err) { console.log(err); }
      callback(null, res);
    });
};

// post.registerUser = (userDetails, callback) => {
//
// };


    // UPDATE media SET ${newMemory.mediaType} = array_append(${newMemory.mediaType}, (SELECT id FROM new_memory))`, [newMemory.username, newMemor
module.exports = post;
