// component/main.js
// imported into app.js

import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './home.js';
import LogIn from './logIn.js';
import SignUp from './signUp.js';
import User from './user.js';

export default class Main extends React.Component {
  render() {
    return(
      <div>
        <div dangerouslySetInnerHTML={{ __html: '<!--{script}-->' }} /> {/* according to the google oauth (routes.js:46), it needs to replace the commented {script} with an actual line of inline js in the html file being used */}
        <br />
        <br />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/user' component={User} /> {/* to be displayed upon successful login/sign-up */}
        </Switch>
      </div>
    );
  }
}