// components/app.js
// imported into ./index.js

import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

class Main extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="The Fantasy Soccer-Football Super League"
          showMenuIconButton={true}
          className="mainTitle" />
        <div>
          Welcome to the Fantasy Soccer-Football Super League!
        </div>
      </div>
    );
  }
}


function mapStateToProps(users) {
    return { users };
}

export default connect(mapStateToProps)(Main);