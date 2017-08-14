require('./d3/d3.js');
require('./../../public/scripts/main.js');
require('./../../public/scripts/s3-helpers.js');
require('./../../public/scripts/s3-uploads.js');
require('./../../public/scripts/sign-up.js');
require('./../../public/scripts/syncedClosing.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('service-worker.js')
           .then(() => { console.log('Service Worker Registered'); });
}
