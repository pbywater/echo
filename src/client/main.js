require('./d3/d3.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('service-worker.js')
           .then(() => { console.log('Service Worker Registered'); });
}
