// components/home.js
// imported into ./app.js

import React from 'react';
import store from '../flow/store.js';

export default class Home extends React.Component {
  linkClick = () => {
    store.dispatch('LOG_IN');
  };
  
  render() {
    return (
      <div>
        <div>
          Welcome to the Fantasy Soccer-Football Super League!
          <br />
          Create your own team and compete against others to prove you are the best at fantasy footy!
        </div>
        <br /><br />
        <a 
          onClick={this.linkClick}
          href="user/auth/google">Log In</a>
      </div>
    );
  }
}