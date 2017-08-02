const connect = require('./db_connect');

const hashPassword = require('./../helpers/hashPassword');

const createMemory = (login, newMemory, mediaType, callback) => {
  console.log('tag is ', newMemory.tag);
  console.log('heading is ', newMemory.heading);
  console.log('memory_text is ', newMemory.memory_text);
  newMemory.tag = newMemory.tag.toLowerCase();
  connect.query(
    `INSERT INTO memories
        (user_id, memory_text, media_type, memory_asset_url, heading, tag, likes, visits)
     VALUES
        ((SELECT users.id FROM users WHERE username = $1 OR email = $1),
          $2, $3, $4, $5, $6, $7, $8)
    `,
    // when we pass in memory_asset_url, memory_heading, line 17 will be replaced with 15
    //  [login, newMemory.memoryText, mediaType, newMemory.memory_asset_url, newMemory.heading, newMemory.tag, likes, visits]
    // $4, $5, $6 are hardcoded below for testing purposes
    [login, newMemory.memory_text, mediaType, 'dummyURL', newMemory.heading, newMemory.tag, 0, 0],

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
