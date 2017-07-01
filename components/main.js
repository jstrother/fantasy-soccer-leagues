// component/main.js
// imported into app.js

import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './home.js';
import User from './user.js';

export default class Main extends React.Component {
  render() {
    return(
      <div>
        <br />
        <br />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/user' component={User} />
        </Switch>
      </div>
    );
  }
}