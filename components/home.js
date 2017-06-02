// components/app.js
// imported into ./index.js

import React from 'react';
import { connect } from 'react-redux';

import SignUp from './signUp.js';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          Welcome to the Fantasy Soccer-Football Super League!
          <br />
          Create your own team and compete against others to prove you are the best at fantasy footy!
        </div>
        <SignUp users={this.props.users} />
      </div>
    );
  }
}


function mapStateToProps(users) {
    return { users };
}

export default connect(mapStateToProps)(Home);