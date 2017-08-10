const { updateEmailVerification } = require('./../../database/db_update');

module.exports = (req, res) => {
  updateEmailVerification(req.params.username, req.params.token, (err, response) => {
    if (err) return res.send(err);
    res.redirect('/');
  });
};
