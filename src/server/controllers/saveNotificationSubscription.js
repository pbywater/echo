const { updateNotificationSubscription } = require('./../../database/db_update');

module.exports = (req, res) => {
  // console.log('req.body is', req.body);
// req.session is currently empty. This will be fixed. Hardcoding test at the moment.
// console.log(typeof );
  updateNotificationSubscription(JSON.stringify(req.body), 'test', (err, result) => {
    if (err) {
      res.status(400).send({ err: err.message });
      return
    }
    // res.redirect('/');
    res.status(200).send('ok');
  })
}
