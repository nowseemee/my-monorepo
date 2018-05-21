self.importScripts('sw-toolbox.js');
self.importScripts('service-worker.js');

self.addEventListener('install', function() {
    clients
        .matchAll({
            includeUncontrolled: true,
        })
        .then((allClients) => {
            allClients.forEach((client) =>
                client.postMessage({
                    type: 'install',
                    body: 'A new version is available.',
                })
            );
        });
});

self.addEventListener('message', function(event) {
    toolbox.cache(event.data, {
        cache: {
            name: 'storage',
        },
    });
});

toolbox.router.get('/(.*)', toolbox.cacheFirst, {
    // Use a dedicated cache for the responses, separate from the default cache.
    cache: {
        name: 'storage-core',
        maxEntries: 1,
    },

    origin: /storage\.googleapis\.com$/,
});

// self.addEventListener('fetch', function(event) {
//     self.isOnline !== navigator.onLine &&
//         console.log('navigator.onLine', navigator.onLine);
//     self.isOnline = navigator.onLine;
// });
