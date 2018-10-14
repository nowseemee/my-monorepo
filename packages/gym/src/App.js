import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Days from './pages/days';

import Home from './pages/home';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/:session/:section?/:exercise?" component={Days} />
      </Fragment>
    );
  }
}

export default App;
