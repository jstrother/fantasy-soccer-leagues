// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import { fetchUser, addLeague } from '../flow/subActions/userActions.js';

import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';

import FantasyClub from './fantasyClub.js';
import FantasyLeague from './fantasyLeague.js';
// import FantasyChampsLeague from './fantasyChampsLeague.js';
import LoginPage from './loginPage.js';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Home extends React.Component {
  
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  
  selectLeagueChange(event, key, value) {
    const accessToken = Cookies.get('accessToken');
    let fantasyLeagueName,
      fantasyLeagueId = value;
    
    nameFinder(value);
    
    this.props.dispatch(
      {
        type: 'SELECT_LEAGUE',
        fantasyLeagueId,
        fantasyLeagueName
      }
    );
    
    function nameFinder(value) {
      LEAGUE_IDS_NAMES.forEach(league => {
        if (league.id === value) {
          fantasyLeagueName = league.name;
        }
      });
    }
  }
  
  render() {
    console.log('user', this.props.currentUser);
    if (!this.props.currentUser || this.props.currentUser.googleId === undefined) {
      return (
        <div>
          <br /><br />
          <div>
            Welcome to the Fantasy Soccer-Football Super League!
            <br />
            Create your own team and compete against others to prove you are the best at fantasy footy!
          </div>
          <br /><br />
          <section className="login-section"><LoginPage /></section>
        </div>
      );
    } 
    
    if (this.props.currentUser && !this.props.currentUser.fantasyLeagueId) {
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
          <div>
            Which league will be the basis for your fantasy soccer?
            <DropDownMenu
              value={0}
              onChange={this.selectLeagueChange.bind(this)}>
              {LEAGUE_IDS_NAMES.map(league => {
                return <MenuItem key={league.id} value={league.id} primaryText={league.name} />;
              })}
            </DropDownMenu>
          </div>
          <FantasyClub />
          <FantasyLeague />
        </div>
      );
    } 
    
    if (this.props.currentUser && this.props.currentUser.fantasyLeagueId) {
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
          <div>
            Your fantasy league is based on {this.props.currentUser.fantasyLeagueName}.
          </div>
          <FantasyClub />
          <FantasyLeague />
        </div>
      );
    }
  }
}

const mapHomeStateToProps = state => ({
  currentUser: {
    googleId: state.loginReducer.googleId,
    displayName: state.loginReducer.displayName,
    givenName: state.loginReducer.givenName,
    familyName: state.loginReducer.familyName,
    userPhoto: state.loginReducer.userPhoto,
    fantasyLeagueId: state.loginReducer.fantasyLeagueId,
    fantasyLeagueName: state.loginReducer.fantasyLeagueName
  }
});

const LogIn = connect(
  mapHomeStateToProps
)(Home);

export default LogIn;