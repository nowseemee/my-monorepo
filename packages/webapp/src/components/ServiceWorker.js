import { Component } from 'react';
import { actions, initFirestore } from '../store';

export const sendMessageToSw = (type, url) => {
    'serviceWorker' in navigator &&
        navigator.serviceWorker.controller !== null &&
        navigator.serviceWorker.controller.postMessage({ type, url });
};

export default class ServiceWorker extends Component {
    componentDidMount() {
        'serviceWorker' in navigator &&
            typeof navigator.serviceWorker.controller === 'object' &&
            navigator.serviceWorker.addEventListener(
                'message',
                this.handleMessage
            );

        initFirestore(window.localStorage.getItem('userId'));
    }

    handleMessage = (event) => {
        event.data.type === 'install' && this.handleInstall(event.data);
        event.data.type === 'cache' && this.handleCache(event.data);
        event.data.type === 'uncache' && this.handleUnCache(event.data);
        event.data.type === 'match' && this.handleMatch(event.data);
    };

    handleInstall = (data) => {
        actions.setToast({
            ...data,
            action: () => window.location.reload(),
            actionLabel: 'Reload!',
        });
    };

    handleCache = (data) => {
        actions.setToast({ body: 'Cached happily', url: data.url });
        actions.setPlayListItemPropertiesByUrl({
            url: data.url,
            property: { isCached: true, isLoading: false },
        });
    };
    handleUnCache = (data) => {
        actions.setToast({ body: 'UnCached happily', url: data.url });
        actions.setPlayListItemPropertiesByUrl({
            url: data.url,
            property: { isCached: false, isLoading: false },
        });
    };
    handleMatch = (data) => {
        actions.setPlayListItemPropertiesByUrl({
            url: data.url,
            property: { isCached: data.hit },
        });
    };

    render() {
        return null;
    }
}
