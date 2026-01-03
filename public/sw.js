// Service Worker for moex0 Blog
// Provides offline support and caches recently read articles

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `moex0-static-${CACHE_VERSION}`;
const ARTICLE_CACHE = `moex0-articles-${CACHE_VERSION}`;
const MAX_ARTICLES = 10;

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/favicon.svg',
  '/404',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name.startsWith('moex0-') && 
                   name !== STATIC_CACHE && 
                   name !== ARTICLE_CACHE;
          })
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle article pages - cache on visit
  if (url.pathname.startsWith('/blog/')) {
    event.respondWith(handleArticleRequest(request));
    return;
  }

  // Handle static assets - cache first
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Default - network first with cache fallback
  event.respondWith(handleDefaultRequest(request));
});

// Check if request is for a static asset
function isStaticAsset(pathname) {
  const staticExtensions = ['.css', '.js', '.woff', '.woff2', '.png', '.jpg', '.jpeg', '.svg', '.ico'];
  return staticExtensions.some(ext => pathname.endsWith(ext)) ||
         pathname.startsWith('/_astro/');
}

// Handle static assets - cache first, then network
async function handleStaticRequest(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline page if available
    return caches.match('/404') || new Response('Offline', { status: 503 });
  }
}

// Handle article requests - network first, cache for offline
async function handleArticleRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache the article
      const cache = await caches.open(ARTICLE_CACHE);
      cache.put(request, response.clone());
      
      // Trim old articles to keep only the most recent MAX_ARTICLES
      trimArticleCache();
    }
    
    return response;
  } catch (error) {
    // Try to serve from cache
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline page
    return caches.match('/404') || new Response('Article unavailable offline', { status: 503 });
  }
}

// Handle default requests - network first
async function handleDefaultRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline fallback
    if (request.headers.get('Accept')?.includes('text/html')) {
      return caches.match('/404') || new Response('Offline', { status: 503 });
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Trim article cache to keep only the most recent articles
async function trimArticleCache() {
  const cache = await caches.open(ARTICLE_CACHE);
  const keys = await cache.keys();
  
  if (keys.length > MAX_ARTICLES) {
    // Delete oldest entries (first in the list)
    const toDelete = keys.slice(0, keys.length - MAX_ARTICLES);
    await Promise.all(toDelete.map(key => cache.delete(key)));
  }
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
