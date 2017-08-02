const { createUser } = require('./../../database/db_create');
const sendEmail = require('./../../helpers/emailVerification');
const { createToken } = require('./../../helpers/helpers');

module.exports = (req, res) => {
  // create random 16 character token for email verification
  console.log('REQ IS', req);

  const passwordToken = createToken();

  req.body.passwordToken = passwordToken;

  createUser(req.body, (dbError, dbResponse) => {
    if (dbError) {
      // will be refactored, so that err.message is displayed on screen
      res.status(400).send({ dbError: dbError.message });
      return;
    }
    sendEmail(req.body.username, req.body.email, verificationToken, (SESError, SESResponse) => {
      if (SESError) {
        res.status(400).send({ SESError: SESError.message });
        return
      }
      console.log('Message sent successfully');
      console.log('Server responded with "%s"', SESResponse.response);
      res.redirect('/');
    })
  })
};
