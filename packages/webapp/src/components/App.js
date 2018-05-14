import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Navigation from '../components/Navigation';
import User from '../components/User';
import Player from '../components/Player';
import TrackInfo from '../components/TrackInfo';
import { Provider } from '../store.js';

class App extends Component {
    render() {
        return (
            <Provider>
                <div>
                    <Navigation routes={this.props.route.routes} />
                    <div style={{ display: 'inline-flex', margin: '10px 0' }}>
                        <User />
                        <TrackInfo />
                    </div>
                    <Player />
                    {renderRoutes(this.props.route.routes)}
                </div>
            </Provider>
        );
    }
}

export default App;
