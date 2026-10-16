// Minimal offline cache so the app works without a connection.
const CACHE = "familymeals-v8";
const ASSETS = ["./index.html","./manifest.json","./icon-180.png","./icon-192.png","./icon-512.png","./meal-beefbowl.jpeg","./meal-sheetpanchicken.jpg","./meal-bakedsalmon.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)).catch(()=>caches.match("./index.html")));
});
