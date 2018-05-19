import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import { convertCustomRouteConfig, ensureReady } from './rrv4Helpers';
import { HelmetProvider } from 'react-helmet-async';

const routeConfig = convertCustomRouteConfig(routes);

if (typeof window !== 'undefined') {
    const registerServiceWorker = require('./registerServiceWorker').default;
    ensureReady(routeConfig, window.location.pathname).then(() => {
        ReactDOM.hydrate(
            <HelmetProvider>
                <BrowserRouter>{renderRoutes(routeConfig)}</BrowserRouter>
            </HelmetProvider>,
            document.getElementById('root')
        );
    });
    registerServiceWorker('/sw.js');
}

export { default as renderHtml } from './components/Html';
export default (location, props, assets, helmetContext) =>
    ensureReady(routeConfig, location).then(() => (
        <HelmetProvider context={helmetContext}>
            <StaticRouter context={{}} location={location}>
                {renderRoutes(routeConfig, props)}
            </StaticRouter>
        </HelmetProvider>
    ));
