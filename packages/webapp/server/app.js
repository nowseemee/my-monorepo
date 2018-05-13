const express = require('express');
const { renderToString } = require('react-dom/server');
const app = express();
const renderApp = require('./bundle.js').default || require('./bundle.js');
const assets = require('./asset-manifest.json');

module.exports = app.get('**', (request, response) => {
    renderApp(request.originalUrl, {}, assets).then((App) => {
        return response.send(renderToString(App));
    });
});
