const { createUser } = require('./../../database/db_create');

module.exports = (req, res) => {
  // create random 16 character token
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 16; i > 0; --i) {
    token += chars[Math.round(Math.random() * (chars.length - 1))];
  }

  // create expiration date
  const expires = new Date();
  expires.setHours(expires.getHours() + 6);

  req.body.token = token;
  req.body.expires = expires;

  createUser(req.body, (error, response) => {
    if (error) {
      // will be refactored, so that err.message is displayed on screen
      res.status(400).send({ error: error.message });
    }
    res.redirect('/');
  });
};
