import { Component } from 'react';
import { actions, initFirestore } from '../store';

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
    };

    handleInstall = (data) => {
        actions.setToast({
            ...data,
            action: () => window.location.reload(),
            actionLabel: 'Reload!',
        });
    };

    render() {
        return null;
    }
}
