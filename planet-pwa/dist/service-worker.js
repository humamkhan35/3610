const CACHE_NAME = "planet-pocket-v1";
const FILES = [ "./", "./index.html", "./style.css", "./app.js", "./topics.json", "./manifest.json", "./promo.html", "./documentation.html", "./programmer-doc.html", "./assets/icon.png", "./assets/images/mercury.png", "./assets/images/venus.png", "./assets/images/earth.png", "./assets/images/mars.png", "./assets/images/jupiter.png", "./assets/images/saturn.png", "./assets/audio/mercury.mp3", "./assets/audio/venus.mp3", "./assets/audio/earth.mp3", "./assets/audio/mars.mp3", "./assets/audio/jupiter.mp3", "./assets/audio/saturn.mp3"
];
self.addEventListener("install", function(event) { event.waitUntil( caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(FILES); }) );
});
self.addEventListener("fetch", function(event) { event.respondWith( caches.match(event.request).then(function(response) { return response || fetch(event.request); }) );
});