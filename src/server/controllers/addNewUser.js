const { createUser } = require('./../../database/db_create');

module.exports = (req, res) => {
  createUser(req.body, (error, response) => {
    if (error) {
      // will be refactored, so that err.message is displayed on screen
      res.status(400).send({ error: error.message });
    }
    res.redirect('/');
  });
};
