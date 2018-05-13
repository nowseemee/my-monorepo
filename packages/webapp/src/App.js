import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

import firebase from 'firebase/app';
import config from './config';

firebase.initializeApp(config);

class App extends Component {
    state = { isGoogleClientReady: false };
    loadYoutubeApi() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/client.js';

        script.onload = () => {
            // Client ID and API key from the Developer Console
            const CLIENT_ID =
                '652763555524-9cu9pjdhqarkt8hsib4g94ast9mi4rgr.apps.googleusercontent.com';

            // Array of API discovery doc URLs for APIs used by the quickstart
            const DISCOVERY_DOCS = [
                'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
            ];

            // Authorization scopes required by the API. If using multiple scopes,
            // separated them with spaces.
            const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
            window.gapi.load('client:auth2', () =>
                window.gapi.client
                    .init({
                        discoveryDocs: DISCOVERY_DOCS,
                        clientId: CLIENT_ID,
                        scope: SCOPES,
                    })
                    .then(() => {
                        this.setState({ isGoogleClientReady: true });
                    })
            );
        };

        document.body.appendChild(script);
    }

    componentDidMount() {
        this.loadYoutubeApi();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React yey!</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>

                <img src="img/unicorn.png" alt="" />

                {this.state.isGoogleClientReady &&
                    renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default App;
