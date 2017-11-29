// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import { fetchUser, addLeague, userLeague } from '../flow/subActions/userActions.js';

import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';

import FantasyClub from './fantasyClub.js';
import FantasyLeague from './fantasyLeague.js';
// import FantasyChampsLeague from './fantasyChampsLeague.js';
import HelloCoach from './helloCoach.js';
import { LoginPage } from './loginPage.js';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Home extends React.Component {
  
  componentDidMount() {
    const accessToken = Cookies.get('accessToken'),
      googleId = this.props.googleId;
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
    }
    if (googleId) {
      this.props.dispatch(userLeague(accessToken, googleId));
    }
  }
  
  selectLeagueChange(event, key, value) {
    const accessToken = Cookies.get('accessToken');
    
    let fantasyLeagueId = value,
      fantasyLeagueName;
      
    leagueNameFinder(fantasyLeagueId);
    
    this.props.dispatch(addLeague(accessToken, fantasyLeagueId, fantasyLeagueName));
    
    function leagueNameFinder(leagueId) {
      LEAGUE_IDS_NAMES.forEach(league => {
        if (league.id === leagueId) {
          fantasyLeagueName = league.name;
        }
      });
    }
  }
  
  render() {
    if (this.props.googleId === undefined || !this.props.googleId) {
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
    
    if (this.props.googleId && !this.props.fantasyLeagueId) {
      return (
        <div>
          <br /><br />
          <div>
            Welcome to the Fantasy Soccer-Football Super League!
          </div>
          <br /><br />
          <HelloCoach />
          <div>
            Which league will be the basis for your fantasy soccer?
            <DropDownMenu
              className="league-selection"
              value={0}
              onChange={this.selectLeagueChange.bind(this)}>
              {LEAGUE_IDS_NAMES.map(league => {
                return <MenuItem key={league.id} value={league.id} primaryText={league.name} />;
              })}
            </DropDownMenu>
          </div>
        </div>
      );
    } 
    
    if (this.props.googleId && this.props.fantasyLeagueId) {
      return (
        <div>
          <br /><br />
          <div>
            Welcome to the Fantasy Soccer-Football Super League!
          </div>
          <br /><br />
          <HelloCoach />
          <div>
            Your fantasy league is based on {this.props.fantasyLeagueName}.
          </div>
          <FantasyClub />
          <FantasyLeague />
        </div>
      );
    }
  }
}

const mapHomeStateToProps = state => (
  {
    googleId: state.loginReducer.googleId,
    displayName: state.loginReducer.displayName,
    givenName: state.loginReducer.givenName,
    userPhoto: state.loginReducer.userPhoto,
    fantasyLeagueId: state.loginReducer.fantasyLeagueId,
    fantasyLeagueName: state.loginReducer.fantasyLeagueName
  }
);

const LogIn = connect(
  mapHomeStateToProps
)(Home);

export default LogIn;