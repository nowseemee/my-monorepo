self.importScripts('sw-toolbox.map.js');

toolbox.router.get('/(.*)', toolbox.networkFirst, {
    // Use a dedicated cache for the responses, separate from the default cache.
    cache: {
        name: 'googleApis',
        // Store up to 10 entries in that cache.
        maxEntries: 10,
        // Expire any entries that are older than 30 seconds.
        maxAgeSeconds: 30000,
    },

    origin: /\.googleapis\.com$/,
});

self.importScripts('service-worker.js');
