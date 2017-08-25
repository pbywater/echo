const { createUser } = require('./../../database/db_create');
const { sendEmail } = require('./../../helpers/emailVerification');
const qs = require('querystring');

module.exports = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const parsedData = {};
    parsedData.email = qs.parse(body).email;
    parsedData.username = qs.parse(body).username;
    parsedData.password = qs.parse(body).password;

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(parsedData.email)) {
      res.status(400).send(JSON.stringify('Please enter a valid email address.'));
      return;
    }

    if (parsedData.username.length < 3) {
      res.status(400).send(JSON.stringify('Please enter a username that is 3 characters or longer.'));
      return;
    }

    if (parsedData.password.length < 6) {
      res.status(400).send(JSON.stringify('Please enter a password that is 6 characters or longer.'));
      return;
    }


  // create random 16 character token for email verification
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 16; i > 0; --i) {
      token += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    parsedData.token = token;

    createUser(parsedData, (dbError, dbResponse) => {
      if (dbError) {
        res.status(400).send(JSON.stringify(dbError.message));
        return;
      }
      req.session.name = parsedData.username;
      req.session.id = dbResponse.rows[0].id;
      sendEmail(parsedData.username, parsedData.email, token, (SESError, SESResponse) => {
        if (SESError) {
          res.status(400).send(JSON.stringify('Sorry, there was an internal error.'));
          return;
        }
        console.log('Message sent successfully');
        console.log('Server responded with "%s"', SESResponse.response);
        res.status(200).redirect('/');
      });
    });
  });
};
