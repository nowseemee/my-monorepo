const { renderToString } = require('react-dom/server');
const renderHtml = require('./bundle.js').renderHtml;
const renderApp = require('./bundle.js').default || require('./bundle.js');
const assets = require('./asset-manifest.json');
const helmetContext = {};

module.exports = (url = '/') =>
    renderApp(url, {}, assets, helmetContext).then((app) => {
        const body = renderToString(app);
        const html = renderToString(renderHtml({ assets, helmetContext }));
        return html.replace(
            '<div id="root"></div>',
            '<div id="root">' + body + '</div>'
        );
    });
