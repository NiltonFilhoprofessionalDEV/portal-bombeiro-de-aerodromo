const CACHE_NAME = "portal-bombeiro-v22";

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
  "./assets/decorations/med-cross.svg",
  "./assets/hero/hero-main.jpg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/categories/ptr.jpg",
  "./assets/categories/operacoes.jpg",
  "./assets/categories/manuais.jpg",
  "./assets/categories/legislacao.jpg",
  "./assets/categories/formularios.jpg",
  "./assets/categories/sistemas.jpg",
  "./assets/systems/mais-gestao.jpg",
  "./assets/systems/intramed.jpg",
  "./assets/systems/next.jpg",
  "./assets/systems/unicorp.jpg",
  "./assets/systems/meu-rh.jpg",
  "./assets/systems/academia-ccr.jpg"
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
