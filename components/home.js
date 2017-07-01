// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import { fetchUser } from '../flow/actions.js';

import FantasyClub from './fantasyClub.js';
import FantasySchedule from './fantasySchedule.js';
import FantasyLeague from './fantasyLeague.js';
import FantasyChampsLeague from './fantasyChampsLeague.js';

class Home extends React.Component {
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  
  render() {
    if (!this.props.currentUser) {
      return (
        <div>
          <div>
            Welcome to the Fantasy Soccer-Football Super League!
            <br />
            Create your own team and compete against others to prove you are the best at fantasy footy!
          </div>
          <br /><br />
          <section className="login-section"><LoginPage /></section>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            Welcome to the Fantasy Soccer-Football Super League!
          </div>
          <br /><br />
          Hello, Coach {this.props.currentUser.familyName}!
          <FantasyClub />
  				<FantasySchedule />
  				<FantasyLeague />
  				<FantasyChampsLeague />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.app.currentUser,
  loading: state.app.loading,
  statusCode: state.app.statusCode
});

const LogIn = connect(
  mapStateToProps
)(Home);

export default LogIn;