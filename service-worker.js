const CACHE_NAME = 'denis-portfolio-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/scripts.js',
  '/simulate-run.js',
  '/assets/img/logo-animado-denis.svg',
  // adicione aqui outras rotas estáticas e builds dos Plays
];

// Instalação e cache inicial
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Intercept fetch
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});
