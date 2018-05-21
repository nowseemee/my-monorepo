import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Navigation from '../components/Navigation';
import User from '../components/User';
import Player from '../components/Player';
import TrackInfo from '../components/TrackInfo';
import Head from '../components/Head';
import MediaSession from '../components/MediaSession';
import SnackBar from '../components/SnackBar';
import ServiceWorker from '../components/ServiceWorker';

import { Provider } from '../store';
import { css } from 'emotion';

const styles = {
    app: css`
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    `,
    header: css`
        display: inline-flex;
        flex-direction: row;
    `,
    track: css`
        flex: 20;
    `,
    user: css`
        flex: 1;
        display: flex;
        flex-direction: column;
    `,
    navigation: css`
        display: inline-flex;
        justify-content: space-evenly;
        padding: 12px 0;
    `,
    body: css`
        flex: 1;
    `,
};

class App extends Component {
    render() {
        return (
            <Provider>
                <ServiceWorker />
                <MediaSession />
                <Head />
                <style>
                    {`html,body,#root { height: 100%; margin: 0; font-family: Roboto, sans-serif; overflow: hidden }`}
                </style>

                <div className={styles.app}>
                    <header className={styles.header}>
                        <div className={styles.track}>
                            <TrackInfo height={104} />
                            <Player />
                        </div>
                        <div className={styles.user}>
                            <User />
                        </div>
                    </header>
                    <div className={styles.navigation}>
                        <Navigation routes={this.props.route.routes} />
                    </div>
                    <div className={styles.body}>
                        {renderRoutes(this.props.route.routes)}
                    </div>
                </div>

                <SnackBar />
            </Provider>
        );
    }
}

export default App;
