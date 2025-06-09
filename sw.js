// قم بزيادة رقم الإصدار مع كل تحديث للملفات الرئيسية
const CACHE_NAME = 'visit-checker-v5'; 
const urlsToCache = [
    '/',
    '/index.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// هذا الكود مهم لتنظيف الكاش القديم وضمان عمل التحديثات
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
