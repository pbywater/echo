const { getUserByEmail } = require('./../../database/db_get');
const { updatePasswordToken } = require('./../../database/db_update');
const { passwordReset } = require('./../../helpers/emailVerification');

module.exports = (req, res) => {
  // create random 16 character token for password reset
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 16; i > 0; --i) {
    token += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  req.body.token = token;

  updatePasswordToken(req.body.email, token, (err, response) => {
    if (err) {
      res.status(400).send(JSON.stringify(err.message));
    }

    getUserByEmail(req.body, (err, response) => {
      if (err) {
        res.status(400).send(JSON.stringify(err.message));
        return;
      }

      passwordReset(response.username, req.body.email, token, (SESError, SESResponse) => {
        if (SESError) {
          res.status(400).send({ SESError: SESError.message });
          return;
        }
        res.status(200).redirect('/password_redirect');
      });
    });
  });
};
