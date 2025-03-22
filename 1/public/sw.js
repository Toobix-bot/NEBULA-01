// Service Worker für Offline-Funktionalität
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('nebula-odyssey-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/_next/static/chunks/main.js',
        '/_next/static/chunks/webpack.js',
        '/_next/static/chunks/pages/_app.js',
        '/_next/static/chunks/pages/index.js',
        '/_next/static/chunks/pages/dashboard.js',
        '/_next/static/chunks/pages/skills.js',
        '/_next/static/chunks/pages/quests.js',
        '/_next/static/chunks/pages/reflection.js',
        '/_next/static/css/styles.css',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open('nebula-odyssey-v1').then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // If fetch fails, return the offline page
        if (event.request.url.indexOf('/dashboard') !== -1 ||
            event.request.url.indexOf('/skills') !== -1 ||
            event.request.url.indexOf('/quests') !== -1 ||
            event.request.url.indexOf('/reflection') !== -1) {
          return caches.match('/');
        }
      });
    })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['nebula-odyssey-v1'];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
