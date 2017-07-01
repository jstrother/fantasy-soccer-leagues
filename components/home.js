// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux'

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
          onClick={this.logIn}
          href="user/auth/google">Log In</a>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLinkClick: (googleId, accessToken) => {
      dispatch({
        type: 'LOG_IN',
        googleId,
        accessToken
      });
    }
  };
};

const userHome = connect(
  null,
  mapDispatchToProps
)(Home);

export default userHome;