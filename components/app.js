// components/app.js
// imported into ./index.js

import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

import User from './user.js';

/*
User
  userName
  FantasyTeam
  FantasyLeague
  FantasySchedule
  

mapStateToProps focuses on users for now
*/

class Main extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="The Fantasy Soccer-Football Super League"
                showMenuIconButton={false}
                className="mainTitle" />
        <User />
        
      </div>
    );
  }
}


function mapStateToProps(users) {
    return { users };
}

export default connect(mapStateToProps)(Main);