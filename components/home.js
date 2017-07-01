// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux'

import { logIn } from '../flow/actions.js';

class Home extends React.Component {
  
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
          onClick={this.props.onLogInClick}
          href="user/auth/google">Log In</a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogInClick: (googleId, accessToken) => {
      dispatch(logIn(googleId, accessToken));
    }
  };
};

const LogIn = connect(
  null,
  mapDispatchToProps
)(Home);

export default LogIn;