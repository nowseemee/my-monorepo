import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import { convertCustomRouteConfig, ensureReady } from './rrv4Helpers';
import Html from './components/Html';

const routeConfig = convertCustomRouteConfig(routes);

if (typeof window !== 'undefined') {
    const registerServiceWorker = require('./registerServiceWorker').default;
    ensureReady(routeConfig, window.location.pathname).then(() => {
        ReactDOM.render(
            <BrowserRouter>{renderRoutes(routeConfig)}</BrowserRouter>,
            document.getElementById('root')
        );
    });
    registerServiceWorker('/sw.js');
}

export default (location, props, assets) =>
    ensureReady(routeConfig, location).then(() => (
        <StaticRouter context={{}} location={location}>
            <Html assets={assets}>{renderRoutes(routeConfig, props)}</Html>
        </StaticRouter>
    ));
