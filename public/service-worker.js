/* eslint-disable no-return-await */
/* eslint-disable no-restricted-globals */

// Name our cache
const staticCacheName = "s-app-v1";
const assetsUrls = ["index.html", "manifest.json"];

self.addEventListener("install", async () => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetsUrls);
});
self.addEventListener("activate", (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(nme => name !== staticCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}