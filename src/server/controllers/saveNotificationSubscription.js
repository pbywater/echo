const { updateNotificationSubscription } = require('./../../database/db_update');

module.exports = (req, res) => {
// req.session is currently empty. This will be fixed. Hardcoding test at the moment.

  if (!req.body || !req.body.endpoint) {
    // Not a valid subscription.
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: {
        id: 'no-endpoint',
        message: 'Subscription must have an endpoint.'
      }
    }));
  }

  updateNotificationSubscription(JSON.stringify(req.body), 'test', (err, result) => {
    if (err) {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'unable-to-save-subscription',
          message: 'The subscription was received but we were unable to save it to our database.'
        }
      }));
      return;
    }
    // res.status(200).send('ok');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ data: { success: true } }));
  })
}
