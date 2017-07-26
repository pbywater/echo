const { createUser } = require('./../../database/db_create');
const sendEmail = require('./../../helpers/emailVerification');

module.exports = (req, res) => {
  // create random 16 character token for email verification
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 16; i > 0; --i) {
    token += chars[Math.round(Math.random() * (chars.length - 1))];
  }

  req.body.token = token;

  createUser(req.body, (error, response) => {
    if (error) {
      // will be refactored, so that err.message is displayed on screen
      res.status(400).send({ error: error.message });
    }
    res.redirect('/');
  });

  sendEmail(req.body.username, req.body.email, token, (error, info) => {
    if(error) {
      res.status(400).send({ error: error.message });
    } else {
      console.log('Message sent successfully');
      console.log('Server responded with "%s"', info.response);
    }
  });
};
