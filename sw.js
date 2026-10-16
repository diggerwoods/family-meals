// Minimal offline cache so the app works without a connection.
const CACHE = "familymeals-v13";
const ASSETS = ["./index.html","./manifest.json","./icon-180.png","./icon-192.png","./icon-512.png",
  "./meal-beefbowl.jpeg","./meal-sheetpanchicken.jpg","./meal-bakedsalmon.jpg","./meal-beefstirfry.jpg",
  "./meal-gingerchicken.jpg","./meal-salmonsweetpotato.jpg","./meal-turkeyzucchini.jpg","./meal-veggiefrittata.jpg",
  "./meal-turkeybokchoy.jpg","./meal-beefsweetpotatoskillet.jpg","./meal-chickenlettucewrap.jpg","./meal-teriyakisalmonbowl.jpg",
  "./meal-herbporksweetpotato.jpg","./meal-porkstirfry.jpg","./meal-shreddedbeefbowl.jpg","./meal-salmonbites.jpg","./meal-porktenderloincarrots.jpg"];

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
