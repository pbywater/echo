const { updateEmailVerification } = require('./../../database/db_update');

module.exports = (req, res) => {

 updateEmailVerification(req.params.username, req.params.token, (error, response) => {
   if (err) return res.send(err);
   res.redirect('/');
  })
};
