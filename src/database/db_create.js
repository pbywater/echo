const connect = require('./db_connect');

const hashPassword = require('./../helpers/hashPassword');

const createMemory = (newMemory, mediaType, callback) => {
  connect.query(
    `INSERT INTO memories
        (user_id, memory_text, media_type, memory_asset_url, heading, tag)
     VALUES
        ($1, $2, $3, $4, $5, $6)
    `,
    // Current query will be replaced with query below when signup route is created
    // VALUES
    //  ((SELECT users.id FROM users WHERE users.username = $1), $2, $3, $4, $5, $6)`,
    //  [newMemory.username, newMemory.memoryText, mediaType, newMemory.memory_asset_url, newMemory.heading, newMemory.tag]
    // $1, $4, $5, $6 are hardcoded below for testing purposes
    [1, newMemory.memory_text, mediaType, 'dummyURL', 'dummyHeading', 'dummyTag'],
    (err, res) => {
      if (err) { callback(err); }
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
            (username, password, email)
            VALUES($1, $2, $3);`, [userDetails.username, hash, userDetails.email], (err) => {
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
