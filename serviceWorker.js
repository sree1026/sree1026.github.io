
const cacheName = 'listGamesV2';
const appShells = [
    'index.html',
    'index.js',
    'data/data.js'
];

self.addEventListener('install', (e)=> {
    console.log(e)
    console.log("Service worker is installing");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("Service worker is caching all Contents");
        await cache.addAll(appShells);
        self.skipWaiting();
    })());
});

self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    e.waitUntil((async () => {
        let keys = await caches.keys();
        keys.map(cache => {
            if(cache !== cacheName) {
                console.log('Service Worker: Clearing old cache');
                return caches.delete(cache);
            }
        })
    })())
});

self.addEventListener('fetch', (e) => {
    console.log("Fetching from Service worker");
    e.respondWith((async() => {
        const r = await caches.match(e.request);
        console.log("Service worker fetching data from URL: ", e.request.url);
        if(r) {
            return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`Service worker caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response
        // try {
        //     const response = await fetch(e.request);
        //     const cache = await caches.open(cacheName);
        //     console.log(`Service worker caching new resource: ${e.request.url}`);
        //     cache.put(e.request, response.clone());
        //     return response
        // } catch (error) {
        //     console.log("Error in fetching: ", error);
        //     const r = await caches.match(e.request);
        //     console.log("Service worker fetching data from URL: ", e.request.url);
        //     if(r) {
        //         return r;
        //     }
        // }
    })());
});


