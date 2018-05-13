import App from './App';
import { generateAsyncRouteComponent } from './rrv4Helpers';

export default [
    {
        component: App,
        path: () => `/`,
        routes: [
            {
                path: (parentRoute) => `${parentRoute}`,
                component: generateAsyncRouteComponent({
                    loader: () => import('./UserLayer'),
                }),
                routes: [
                    {
                        path: (parentRoute) => `${parentRoute}dummy`,
                        exact: true,
                        component: generateAsyncRouteComponent({
                            loader: () => import('./Dummy'),
                        }),
                    },
                    {
                        path: (parentRoute) => `${parentRoute}buddy`,
                        exact: true,
                        component: generateAsyncRouteComponent({
                            loader: () => import('./Buddy'),
                        }),
                    },
                ],
            },
        ],
    },
];
