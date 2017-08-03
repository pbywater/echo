const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BPJmORLwdaOx2QAnX1fYEUjDVs9qyVCCjZhTKkSWqFbi5uQ0-8Ovxf998AGacEhnG6VIk46E-jfQ-l5ycoVvPQk',
  privateKey: 'GLqM8ZeQvbKZ7VBQytQwal8m4i_X8X3PblVpdKdbdZA'
};

webpush.setVapidDetails(
  'mailto:echo.annafreud@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
