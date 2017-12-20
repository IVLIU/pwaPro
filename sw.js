let cacheStorageKey = 'FIRST_KEY';

let cacheList = [
    '/',
    './index.html',
    './index.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheStorageKey)
        .then(cache => cache.addAll(cacheList))
    );
});

self.addEventListener('fetch', e => {
    e.responseWith(
        caches.match(e.request)
        .then(res => {
            if(res !== null) {
                return res;
            }
            return fetch(e.request.url);
        })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        Promise.all([
            caches.keys()
            .then(cacheNames => {
                return cacheNames.map(name => {
                    if(name !== cacheStorageKey){
                        caches.delete(name);
                    }
                })
            })
            .then(() => self.client.claim())
        ])
    )
});