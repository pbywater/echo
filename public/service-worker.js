/* eslint-disable */

// Based on code from: https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/

const cacheName = 'echo-app-test-1';

const filesToCache = [
  '/assets/icons/card_icons/audio_folder_icon.svg',
  '/assets/icons/navigate/close_icon.svg',
  '/assets/icons/navigate/menu_icon.svg',
  '/assets/icons/top_bar/search_icon.svg',
  '/assets/icons/top_bar/shuffle_icon.svg',
  '/assets/icons/card_icons/audio_salmon_icon.svg',
  '/assets/icons/card_icons/close.svg',
  '/assets/icons/card_icons/camera_salmon_icon.svg',
  '/assets/icons/card_icons/heart_icon_checked.svg',
  '/assets/icons/card_icons/heart_icon_unchecked.svg',
  '/assets/icons/card_icons/pencil_salmon_icon.svg',
  '/assets/icons/card_icons/photo_folder_icon.svg',
  '/assets/icons/card_icons/photo_folder_icon.svg',
  'https://code.jquery.com/jquery-3.2.1.min.js',
  'https://d3js.org/d3.v4.min.js',
  'https://fonts.googleapis.com/css?family=Quicksand:300,400,500',
  '/',
  '/index.html',
  '/main.css',
  '/bundle.js',
  '/scripts/main.js'];

  self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });

  self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push Codelab';
    const options = {
      body: 'Does this work.',
      icon: '../assets/favicon.png',
      badge: '../assets/favicon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });

  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
      clients.openWindow('echo-af.herokuapp.com') //change
    );
  });

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('This push event has data: ', event.data.text());
  } else {
    console.log('This push event has no data.');
  }
});
