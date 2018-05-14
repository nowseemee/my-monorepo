self.importScripts('sw-toolbox.js');

toolbox.router.get('/(.*)', toolbox.cacheFirst, {
    // Use a dedicated cache for the responses, separate from the default cache.
    cache: {
        name: 'storage',
        // Store up to 10 entries in that cache.
        maxEntries: 10,
        // Expire any entries that are older than 30 seconds.
    },

    origin: /storage\.googleapis\.com$/,
});

self.importScripts('service-worker.js');
