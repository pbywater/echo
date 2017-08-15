const { createUser } = require('./../../database/db_create');
const sendEmail = require('./../../helpers/emailVerification');

module.exports = (req, res) => {
  // create random 16 character token for email verification
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 16; i > 0; --i) {
    token += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  req.session.name = req.body.email;
  req.body.token = token;

  createUser(req.body, (dbError, dbResponse) => {
    if (dbError) {
      // will be refactored, so that err.message is displayed on screen
      res.status(400).send({ dbError: dbError.message });
      return;
    }
    req.session.id = dbResponse.rows[0].id;
    sendEmail(req.body.username, req.body.email, token, (SESError, SESResponse) => {
      if (SESError) {
        res.status(400).send({ error: error.message });
        return;
      }
      console.log('Message sent successfully');
      console.log('Server responded with "%s"', SESResponse.response);
      res.redirect('/');
    });
  });
};
