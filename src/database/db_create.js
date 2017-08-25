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
      if (err) { callback(err); }
      callback(null, res);
    });
};

const createUser = (userDetails, callback) => {
  connect.query(
    `SELECT email
    FROM users
    WHERE email = $1;`, [userDetails.email], (err, emailRes) => {
      if (err) { return callback(new Error('Sorry, there was an internal error.')); }

      if (!emailRes.rows[0]) {
        connect.query(
          `SELECT username
          FROM users
          WHERE username = $1;`, [userDetails.username], (err, usernameRes) => {
            if (err) { return callback(new Error('Sorry, there was an internal error.')); }

            if (!usernameRes.rows[0]) {
              hashPassword(userDetails.password, (err, hash) => {
                if (err) { return callback(new Error('Sorry, there was an internal error.')); }

                connect.query(
                  `INSERT INTO users
                  (username, password, email, token)
                  VALUES($1, $2, $3, $4)
                  RETURNING id;`, [userDetails.username, hash, userDetails.email, userDetails.token], (err, res) => {
                    if (err) { return callback(new Error('Sorry, there was an internal error.')); }
                    callback(null, res);
                  });
              });
            } else {
              callback(new Error('Sorry, that username is taken.'));
            }
          });
      } else {
        callback(new Error('Sorry, that email address is already in use.'));
      }
    });
};

module.exports = {
  createMemory,
  createUser,
};
