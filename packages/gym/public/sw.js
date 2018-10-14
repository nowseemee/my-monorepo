const sendMessage = message =>
  clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(allClients => {
      allClients.forEach(client => client.postMessage(message));
    });

self.addEventListener('install', function() {
  sendMessage({
    type: 'install',
    body: 'A new version is available.',
  });
});

const openStorage = () => caches.open('storage');
const matchUrl = url => openStorage().then(cache => cache.match(url));
const putToStorage = url => response =>
  openStorage().then(storage => storage.put(url, response));
const fetchUrl = url => fetch(url, { mode: 'no-cors' });

self.addEventListener('message', function(event) {
  event.data.type === 'match' &&
    matchUrl(event.data.url).then(match =>
      sendMessage({
        type: 'match',
        hit: !!match,
        url: event.data.url,
      })
    );

  event.data.type === 'cacheAll' &&
    Promise.all(
      event.data.urls.map(url =>
        matchUrl(url).then(
          match => (match ? null : fetchUrl(url).then(putToStorage(url)))
        )
      )
    ).then(() =>
      sendMessage({
        ...event.data,
        type: 'cacheAll',
      })
    );

  event.data.type === 'uncacheAll' &&
    openStorage()
      .then(cache => event.data.urls.map(url => cache.delete(url)))
      .then(() =>
        sendMessage({
          ...event.data,
          type: 'uncacheAll',
        })
      );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});
