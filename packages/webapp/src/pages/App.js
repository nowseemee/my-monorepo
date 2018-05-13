import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Navigation from '../components/Navigation';
import User from '../components/User';

import firebase from 'firebase/app';
import config from '../config';

firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigation routes={this.props.route.routes} />
                <User />
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default App;
