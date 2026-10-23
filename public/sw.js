const CACHE_NAME = "nadon-image-cache-v1";

const isImageRequest = (url) => {
  return (
    url.pathname.startsWith("/images/") ||
    url.hostname.includes("static.showit.co") ||
    /\.(?:png|jpg|jpeg|webp|svg|gif|avif)(?:\?.*)?$/i.test(url.pathname)
  );
};

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (isImageRequest(url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === "opaque")) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          if (cachedResponse) return cachedResponse;
          throw error;
        }
      })
    );
  }
});
