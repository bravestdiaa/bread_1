// تحديد الملفات التي سيتم تخزينها مؤقتاً
const CACHE_NAME = 'visit-checker-v2';
const urlsToCache = [
    '/',
    '/index.html',
    // يمكنك إضافة روابط ملفات الـ CSS والجافاسكريبت هنا إذا فصلتها
];

// حدث التثبيت: يتم فيه تخزين الملفات
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// حدث الجلب: يتم فيه تقديم الملفات من الذاكرة المؤقتة إذا كانت متاحة
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // إذا وجد الملف في الكاش، قم بإرجاعه، وإلا اطلبه من الشبكة
                return response || fetch(event.request);
            })
    );
});
