const CACHE_NAME = 'cetstroam-v1';
const DYNAMIC_CACHE = 'cetstroam-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
];

// API routes that should be handled differently
const API_ROUTES = [
  '/rest/v1/',
  'auth/v1'
];

// Function to determine if a request is an API call
const isApiRequest = (request) => {
  return API_ROUTES.some(route => request.url.includes(route));
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  // Skip API requests - let them be handled by Supabase client
  if (isApiRequest(event.request)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add to dynamic cache
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If offline and resource not in cache, return fallback
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            return null;
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old cache versions
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Ensure service worker takes control immediately
      self.clients.claim()
    ])
  );
});

// Handle sync events for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-exams') {
    event.waitUntil(
      // Attempt to sync data from IndexedDB to Supabase
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SYNC_REQUIRED'
          });
        });
      })
    );
  }
});