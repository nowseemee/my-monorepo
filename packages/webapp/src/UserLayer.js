import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import User from './User';

class App extends Component {
    render() {
        return (
            <div className="User">
                <h2> User Layer yey!</h2>
                <User />
                {this.props.route.routes.map(({ path }) => (
                    <h1 key={path}>
                        <Link to={path}>{path}</Link>
                    </h1>
                ))}
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default App;
