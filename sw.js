const CACHE_NAME = 'shift-scanner-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/preprocessor.js',
  '/talley_counter.js',
  '/data_extractor.js',
  '/shift_data_processor.js',
  '/integrity_check.js',
  '/data_model.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
