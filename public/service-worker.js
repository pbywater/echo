/* eslint-disable */

const cacheName = 'echo-app-test-1';

const filesToCache = [
  'https://code.jquery.com/jquery-3.2.1.min.js',
  'https://d3js.org/d3.v4.min.js',
  '/',
  '/main.css',
  '/index.html',
  '/bundle.js',
  '/assets/icons/card_icons/audio_folder_icon.svg',
  '/assets/icons/navigate/close_icon.svg',
  '/assets/icons/navigate/menu_icon.svg',
  // '/assets/icons/top-bar/search_icon.svg',
  // '/assets/icons/top-bar/shuffle_icon.svg',
  '/assets/icons/card_icons/audio_salmon_icon.svg',
  '/assets/icons/card_icons/camera_salmon_icon.svg',
  '/assets/icons/card_icons/heart_icon_checked.svg',
  '/assets/icons/card_icons/heart_icon_unchecked.svg',
  '/assets/icons/card_icons/pencil_salmon_icon.svg',
  '/assets/icons/card_icons/photo_folder_icon.svg',
  '/assets/icons/card_icons/photo_folder_icon.svg',
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
