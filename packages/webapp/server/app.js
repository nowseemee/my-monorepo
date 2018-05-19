const express = require('express');
const app = express();

const renderToHtml = require('./renderToHtml');

module.exports = app.get('**', (request, response) => {
    renderToHtml(request.originalUrl).then((html) => response.send(html));
});
