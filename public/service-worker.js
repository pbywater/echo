const cacheName = 'echo-app';

const filesToCache = [
  '/',
  '/main.css',
  '/index.html',
  '/bundle.js',
  '/assets/icons/card_icons/audio_folder_icon.svg',
  '/assets/icons/card_icons/audio_salmon_icon.svg',
  '/assets/icons/card_icons/camera_salmon_icon.svg',
  '/assets/icons/card_icons/heart_icon_checked.svg',
  '/assets/icons/card_icons/heart_icon_unchecked.svg',
  '/assets/icons/card_icons/pencil_salmon_icon.svg',
  '/assets/icons/card_icons/photo_folder_icon.svg',
  '/assets/icons/card_icons/photo_folder_icon.svg',
  '/scripts/main.js'];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
    }))),
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request)),
  );
});
