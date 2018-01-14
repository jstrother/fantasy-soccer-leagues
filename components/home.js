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
    event.preventDefault();
    const accessToken = Cookies.get('accessToken');
    
    let fantasyLeagueName;
    console.log('value:', value);
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
          <div
            className={styles.welcome}>
            <p>Welcome to the Fantasy Soccer-Football Super League!</p>
            <br />
            <p>Create your own team and compete against others to prove you are the best at fantasy</p> footy!
          </div>
        </div>
      );
    } 
    
    if (this.props.googleId && !this.props.fantasyLeagueId) {
      return (
        <main>
          <br /><br />
          <div
            className={styles.welcome}>
            <p>Welcome to the Fantasy Soccer-Football Super League!</p>
            <br /><br />
            <p>Which league will be the basis for your fantasy soccer?</p>
            <br />
            <DropDownMenu
              className="league-selection"
              value={0}
              onChange={this.selectLeagueChange.bind(this)}>
              {LEAGUE_IDS_NAMES.map(league => {
                return <MenuItem key={league.id} value={league.id} primaryText={league.name} />;
              })}
            </DropDownMenu>
          </div>
        </main>
      );
    } 
    
    if (this.props.googleId && this.props.fantasyLeagueId) {
      return (
        <main>
          <br /><br />
          <div
            className={styles.welcome}>
            <p>Welcome to the Fantasy Soccer-Football Super League!</p>
            <br />
            <p>You have selected {this.props.fantasyLeagueName}.</p>
          </div>
          <br />
          <div
            className={styles.club}>
            <FantasyClub />
          </div>
          <div
            className={styles.league}>
            <FantasyLeague />
          </div>
        </main>
      );
    }
  }
}

const mapHomeStateToProps = state => (
  {
    googleId: state.userReducer.googleId,
    displayName: state.userReducer.displayName,
    givenName: state.userReducer.givenName,
    userPhoto: state.userReducer.userPhoto,
    fantasyLeagueId: state.userReducer.fantasyLeagueId,
    fantasyLeagueName: state.userReducer.fantasyLeagueName
  }
);

const LogIn = connect(
  mapHomeStateToProps
)(Home);

export default CSSModules(LogIn, styles);