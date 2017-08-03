const connect = require('./db_connect');

const hashPassword = require('./../helpers/hashPassword');

const createMemory = (id, newMemory, mediaType, memoryUrl, callback) => {
  newMemory.tag = newMemory.tag.toLowerCase();
  connect.query(
    `INSERT INTO memories
        (user_id, memory_text, media_type, memory_asset_url, heading, tag, likes, visits)
     VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;`,
    [id, newMemory.memory_text, mediaType, memoryUrl, newMemory.heading, newMemory.tag, 0, 0],

    (err, res) => {
      if (err) {
        console.log('err', err);
        callback(err);
      }
      callback(null, res);
    });
};

const createUser = (userDetails, callback) => {
  connect.query(
    `SELECT username
    FROM users
    WHERE username = $1;`, [userDetails.username], (err, res) => {
      if (err) { return callback(err); }

      if (!res.rows[0]) {
        hashPassword(userDetails.password, (err, hash) => {
          if (err) { return callback(err); }

          connect.query(
            `INSERT INTO users
            (username, password, email, token)
            VALUES($1, $2, $3, $4);`, [userDetails.username, hash, userDetails.email, userDetails.token], (err) => {
              if (err) { return callback(err); }
              callback(null, 'new user added');
            });
        });
      } else {
        callback(new Error('Sorry, that username is taken.'));
      }
    });
};

module.exports = {
  createMemory,
  createUser,
};
