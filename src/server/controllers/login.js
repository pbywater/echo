const { getUser } = require('./../../database/db_get');

const bcrypt = require('bcrypt');
const qs = require('querystring');

module.exports = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const parsedData = {};
    parsedData.login = qs.parse(body).login;
    parsedData.password = qs.parse(body).password;

    getUser(parsedData, (err, user) => {
      if (err) {
        res.status(400).send(JSON.stringify(err.message));
        return;
      }

      bcrypt.compare(parsedData.password, user.password, (err, isAuthenticated) => {
        if (err) {
          res.status(400).send(JSON.stringify(err.message));
        }
        if (isAuthenticated) {
          req.session.name = parsedData.login;
          req.session.id = user.id;
          res.status(200).redirect('/');
        } else if (!isAuthenticated) {
          res.status(400).send(JSON.stringify('Incorrect password'));
        }
      });
    });
  });
};
