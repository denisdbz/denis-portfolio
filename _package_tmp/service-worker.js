const CACHE_NAME = 'denis-portfolio-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/scripts.js',
  '/simulate-run.js',
  '/assets/img/logo-animado-denis.svg',
  // adicione outros assets estáticos ou diretórios
];

// Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Fetch
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});

// Activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});
