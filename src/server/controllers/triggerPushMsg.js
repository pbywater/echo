const getSubscriptions = require('./../../database/db_get.js');
const webpush = require('web-push');

module.exports = (req, res) => {
  const vapidKeys = {
    publicKey: 'BPJmORLwdaOx2QAnX1fYEUjDVs9qyVCCjZhTKkSWqFbi5uQ0-8Ovxf998AGacEhnG6VIk46E-jfQ-l5ycoVvPQk',
    privateKey: 'GLqM8ZeQvbKZ7VBQytQwal8m4i_X8X3PblVpdKdbdZA'
  };

  webpush.setVapidDetails(
    'mailto:echo.annafreud@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  return getSubscriptions()
  .then(function(subscriptions) {
    console.log('subscriptions are', subscriptions);
    let promiseChain = Promise.resolve();

    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      promiseChain = promiseChain.then(() => {
        return triggerPushMsg(subscription, dataToSend);
        .then(() => {
          res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: { success: true } }));
        })
        .catch(function(err) {
          res.status(500);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            error: {
              id: 'unable-to-send-messages',
              message: `We were unable to send messages to all subscriptions : ` +
                `'${err.message}'`
            }
          }));
        });
      });
    }

    return promiseChain;
  })
}

const triggerPushMsg = function(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
  .catch((err) => {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      console.log('Subscription is no longer valid: ', err);
    }
  });
};
