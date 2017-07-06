const bcrypt = require('bcrypt');

module.exports = (plainPassword, callback) => {
  bcrypt.hash(plainPassword, 10, callback);
};
