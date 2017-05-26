// components/app.js
// imported into ./index.js

import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>The Fantasy Soccer-Football Super League</header>
        <div>
          Welcome to the Fantasy Soccer-Football Super League!
          <br />
          Create a your own team and compete against others to prove you are the best at fantasy footy!
        </div>
      </div>
    );
  }
}


function mapStateToProps(users) {
    return { users };
}

export default connect(mapStateToProps)(App);