const CACHE_NAME = 'milpa-nime-v7';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './data/recipes.js',
  './data/ingredients.js',
  './data/seasonality_mx.js',
  './data/mealprep_bases.js',
  './data/health_rules.js',
  './modules/recipes-module.js',
  './assets/fonts/outfit-variable.woff2',
  './assets/fonts/material-symbols-outlined.woff2'
];

self.addEventListener('install', (event) => {
  // No esperar a que se cierren las pestañas viejas: activa esta versión en cuanto termine de instalar.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim()) // toma control de las pestañas abiertas de inmediato
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
