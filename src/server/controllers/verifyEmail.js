const { updateEmailVerification } = require('./../../database/db_update');

module.exports = (req, res) => {

 updateEmailVerification(req.params.username, req.params.token, (error, response) => {
   if (error) { res.status(500).send(error) };
   res.redirect('/');
 })
};
