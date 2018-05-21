self.importScripts('sw-toolbox.js');

const sendMessage = (message) =>
    clients
        .matchAll({
            includeUncontrolled: true,
        })
        .then((allClients) => {
            allClients.forEach((client) => client.postMessage(message));
        });

self.addEventListener('install', function() {
    sendMessage({
        type: 'install',
        body: 'A new version is available.',
    });
});

self.addEventListener('message', function(event) {
    event.data.type === 'match' &&
        caches
            .open('storage')
            .then((cache) => cache.match(event.data.url))
            .then((match) =>
                sendMessage({
                    type: 'match',
                    hit: !!match,
                    url: event.data.url,
                })
            );

    event.data.type === 'cache' &&
        toolbox
            .cache(event.data.url, {
                cache: {
                    name: 'storage',
                },
            })
            .then(() =>
                sendMessage({
                    type: 'cache',
                    url: event.data.url,
                })
            );
    event.data.type === 'uncache' &&
        toolbox
            .uncache(event.data.url, {
                cache: {
                    name: 'storage',
                },
            })
            .then(() =>
                sendMessage({
                    type: 'uncache',
                    url: event.data.url,
                })
            );
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
