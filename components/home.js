// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import { fetchUser } from '../flow/actions.js';

import FantasyClub from './fantasyClub.js';
import FantasyLeague from './fantasyLeague.js';
// import FantasyChampsLeague from './fantasyChampsLeague.js';
import LoginPage from './loginPage.js';

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
          <br /><br />
          <div>
            Welcome to the Fantasy Soccer-Football Super League!
            <br />
            Create your own team and compete against others to prove you're the best at fantasy footy!
          </div>
          <br /><br />
          <section className="login-section"><LoginPage /></section>
        </div>
      );
    } else {
      return (
        <div>
          <br /><br />
          <div>
            Welcome to the Fantasy Soccer-Football Super League!
          </div>
          <br /><br />
          <div>
            Hello, Coach {this.props.currentUser.familyName}!
          </div>
          <FantasyClub />
          <FantasyLeague />
        </div>
      );
    }
  }
}

const mapHomeStateToProps = state => ({
  currentUser: state.loginReducer.currentUser
});

const LogIn = connect(
  mapHomeStateToProps
)(Home);

export default LogIn;