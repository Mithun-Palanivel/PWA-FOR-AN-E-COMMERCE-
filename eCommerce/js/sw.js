const CACHE_NAME = "amazon-pwa-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/cart.html",
  "/css/styles.css",
  "/js/app.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
