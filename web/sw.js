const staticCacheName = 'static-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/assets/styles/main.css',
  '/assets/icons/icon192.png',
  '/assets/icons/icon512.png',
  '/assets/icons/apple-touch-icon.png',
  '/assets/icons/favicon.ico',
  '/assets/icons/icon.svg',
  '/assets/icons/logo.svg',
  '/assets/scripts/main.js',
  '/assets/manifest.json',
  '/fallback.html'
];

const limitCacheSize = async (cacheName, size) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > size) {
    await cache.delete(keys[0]);
    limitCacheSize(cacheName, size);
  }

  return;
};

const cacheResources = async () => {
  try {
    const cache = await caches.open(staticCacheName);
    return cache.addAll(assets);
  } catch (error) {
    console.log(error);
  }
};

const refreshCaches = async () => {
  try {
    const keys = await caches.keys();
    const oldKeys = keys.filter(
      (key) => key !== staticCacheName && key !== dynamicCacheName
    );
    return oldKeys.map((key) => caches.delete(key));
  } catch (error) {
    console.log(error);
  }
};

const sendCachedAsset = async (request) => {
  try {
    const cacheRes = await caches.match(request);
    if (cacheRes) return cacheRes;

    const fetchRes = await fetch(request);
    const cache = await caches.open(dynamicCacheName);
    await cache.put(fetchRes.url, fetchRes.clone());
    limitCacheSize(dynamicCacheName, 20);
    return fetchRes;
  } catch (error) {
    if (request.url.indexOf('.html') > -1) {
      return caches.match('/fallback.html');
    }
  }
};

self.addEventListener('install', (evt) => {
  evt.waitUntil(cacheResources());
});

self.addEventListener('activate', async (evt) => {
  evt.waitUntil(refreshCaches());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(sendCachedAsset(evt.request));
});
