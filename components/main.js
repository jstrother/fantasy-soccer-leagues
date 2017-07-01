// component/main.js
// imported into app.js

import React from 'react';

import { Route, Switch } from 'react-router-dom';
import LogIn from './home.js';
import User from './user.js';

export default class Main extends React.Component {
  render() {
    return(
      <div>
        <br />
        <br />
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route path='/user' component={User} />
        </Switch>
      </div>
    );
  }
}