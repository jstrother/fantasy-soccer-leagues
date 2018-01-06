// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import CSSModules from 'react-css-modules';

import { addLeague } from '../flow/subActions/userActions.js';

import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';

import FantasyClub from './fantasyClub.js';
import FantasyLeague from './fantasyLeague.js';
import styles from '../scss/home.scss';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Home extends React.Component {
  
  selectLeagueChange(event, key, value) {
    const accessToken = Cookies.get('accessToken');
    
    let fantasyLeagueName;
    
    LEAGUE_IDS_NAMES.forEach(league => {
      if (value === league.id) {
        fantasyLeagueName = league.name;
      }
    });
    
    // fantasyLeagueId is value
    this.props.dispatch(addLeague(accessToken, value, fantasyLeagueName));
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

export default CSSModules(LogIn, styles);