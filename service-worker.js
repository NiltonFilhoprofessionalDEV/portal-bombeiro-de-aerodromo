const CACHE_NAME = "portal-bombeiro-v16";

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/responsive.css",
  "./js/app.js",
  "./js/config.js",
  "./js/links.js",
  "./js/search.js",
  "./js/favorites.js",
  "./assets/logo/logo.svg",
  "./assets/hero/hero-main.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/categories/ptr.png",
  "./assets/categories/operacoes.png",
  "./assets/categories/manuais.png",
  "./assets/categories/legislacao.png",
  "./assets/categories/formularios.png",
  "./assets/categories/sistemas.png",
  "./assets/systems/intramed.png",
  "./assets/systems/next.png",
  "./assets/systems/unicorp.png",
  "./assets/systems/meu-rh.png",
  "./assets/systems/academia-ccr.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
