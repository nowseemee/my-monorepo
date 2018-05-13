import App from './pages/App';
import { generateAsyncRouteComponent } from './rrv4Helpers';

export default [
    {
        component: App,
        path: () => `/`,
        routes: [
            {
                path: (parentRoute) => `${parentRoute}dummy`,
                exact: true,
                component: generateAsyncRouteComponent({
                    loader: () => import('./pages/Dummy'),
                }),
            },
            {
                path: (parentRoute) => `${parentRoute}buddy`,
                exact: true,
                component: generateAsyncRouteComponent({
                    loader: () => import('./pages/Buddy'),
                }),
            },
            {
                path: (parentRoute) => `${parentRoute}youtube`,
                exact: true,
                component: generateAsyncRouteComponent({
                    loader: () => import('./pages/YouTube.js'),
                }),
            },
            {
                path: (parentRoute) => `${parentRoute}my-media`,
                exact: true,
                component: generateAsyncRouteComponent({
                    loader: () => import('./pages/MyMedia.js'),
                }),
            },
        ],
    },
];
