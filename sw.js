const CACHE_NAME = "milpa-nime-v3";
const RUNTIME_CACHE = "milpa-nime-runtime";

// Critical assets required for app to work offline
const CRITICAL_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./data/ingredients.js",
  "./data/seasonality_mx.js",
  "./data/mealprep_bases.js",
  "./data/health_rules.js",
  "./data/recipes.js"
];

// Optional modules (lazy-loaded, can fail offline)
const OPTIONAL_MODULES = [
  "./modules/virtual_list.js"
];

// File types that should be cached
const CACHE_EXTENSIONS = /\.(js|css|svg|woff2|png|gif)$/;

/**
 * Install: Cache critical assets
 */
self.addEventListener("install", (event) => {
  console.log("[SW] Installing cache:", CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache all critical assets
      return cache.addAll(CRITICAL_ASSETS).then(() => {
        // Try to cache optional modules (non-critical)
        Promise.all(OPTIONAL_MODULES.map(url =>
          fetch(url).then(r => cache.put(url, r)).catch(() => {
            console.log("[SW] Optional module not cached:", url);
          })
        ));
      });
    })
  );
});

/**
 * Activate: Clean up old caches
 */
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating, cleaning old caches");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== RUNTIME_CACHE)
          .map((key) => {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

/**
 * Message: Allow app to trigger skipWaiting for updates
 */
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    console.log("[SW] User confirmed update, skipWaiting");
    self.skipWaiting();
  }
});

/**
 * Fetch: Smart caching strategy
 * - Navigation (HTML): network-first with fallback
 * - Assets (JS, CSS, etc): cache-first with fallback
 * - External APIs: network-only
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and external requests
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) {
    // External request: network-only
    event.respondWith(fetch(request).catch(() =>
      new Response("Offline: external resource unavailable", { status: 503 })
    ));
    return;
  }

  // HTML navigation: network-first with cache fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Update cache with fresh version
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => {
          // Fall back to cached index.html
          return caches.match("./index.html").then(r =>
            r || new Response("Offline: app shell unavailable", { status: 503 })
          );
        })
    );
    return;
  }

  // Assets: cache-first with network fallback + update in background
  if (CACHE_EXTENSIONS.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Return cached immediately, update in background if online
          fetch(request)
            .then((fresh) => {
              const cloned = fresh.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, cloned));
            })
            .catch(() => {}); // Silently fail if offline
          return cached;
        }

        // Not in cache: fetch and cache
        return fetch(request)
          .then((response) => {
            if (response.ok && (response.type === "basic" || response.type === "cors")) {
              const cloned = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, cloned));
            }
            return response;
          })
          .catch(() => new Response("Offline: asset unavailable", { status: 503 }));
      })
    );
    return;
  }

  // Everything else: network with fallback
  event.respondWith(
    fetch(request).catch(() =>
      new Response("Offline: request failed", { status: 503 })
    )
  );
});
