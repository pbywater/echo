const { getUser } = require('./../../database/db_get');

const bcrypt = require('bcrypt');

module.exports = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  getUser(req.body, (err, user) => {
    if (err) {
      // will be refactored, so that err.message is displayed on screen
      res.status(400).send({ err: err.message });
      return;
    }

    bcrypt.compare(password, user.password, (err, isAuthenticated) => {
      if (err) {
        // will be refactored, so that err.message is displayed on screen
        res.status(400).send({ err: err.message });
      }
      if (isAuthenticated) {
        req.session.name = login;
        req.session.id = user.id;
        res.status(200).redirect('/');
      } else if (!isAuthenticated) {
        // will be refactored, so that err.message is displayed on screen
        res.status(400).send('Incorrect password');
      }
    });
  });
};
