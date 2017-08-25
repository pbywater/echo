const { updatePassword } = require('./../../database/db_update');

module.exports = (req, res) => {
  const userDetails = req.headers.referer.split('reset/')[1];
  const passwordToken = userDetails.split('/')[0];
  const username = userDetails.split('/')[1];

  updatePassword(username, req.body.password, passwordToken, (err, response) => {
    if (err) return res.status(400).send(err);
    res.redirect('/');
  });
};
