import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Navigation from '../components/Navigation';
import User from '../components/User';
import { Provider } from '../store.js';

import firebase from 'firebase/app';
import config from '../config';

firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <Provider>
                <div>
                    <Navigation routes={this.props.route.routes} />
                    <User />
                    {renderRoutes(this.props.route.routes, {
                        isServer: this.props.isServer,
                    })}
                </div>
            </Provider>
        );
    }
}

export default App;
