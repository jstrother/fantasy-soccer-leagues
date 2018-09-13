/* eslint-disable no-unused-vars, no-console*/
// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { addLeague } from '../flow/subActions/userActions.js';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import FantasyClub from './fantasyClub.js';
import Player from './player.js';
import styles from '../scss/home.scss';

export class Home extends React.Component {
  selectLeagueChange(event) {
    event.preventDefault();
    const fantasyLeagueId = parseInt(event.target.value, 10);
      // we do parseInt on event.target.value as it is a string, but we need it to be a number like league.id
    
    let fantasyLeagueName;
    
    LEAGUE_IDS_NAMES.forEach(league => {
      if (fantasyLeagueId === league.id) {
        fantasyLeagueName = league.name;
      }
    });
    
    this.props.dispatch(addLeague(this.props.accessToken, fantasyLeagueId, fantasyLeagueName));
  }
  
  render() {
    if (this.props.googleId === undefined || !this.props.googleId) {
      return (
        <main>
          <br /><br />
          <div
            className={styles.welcome}>
            <p
              className={styles.welcomeText}>Welcome to the Fantasy Soccer-Football Super League!</p>
            <br />
            <p
              className={styles.welcomeText}>Create your own team and compete against others to prove you are the best at fantasy footy!</p>
          </div>
        </main>
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
            <select
              className="leagueSelection"
              name="leagueSelection"
              value={0}
              onChange={this.selectLeagueChange.bind(this)}>
              {LEAGUE_IDS_NAMES.map(league => {
                return <option key={league.id} value={league.id}>{league.name}</option>;
              })}
            </select>
          </div>
        </main>
      );
    } 
    
    if (this.props.googleId && this.props.fantasyLeagueId) {
      return (
        <main>
          <div
            className={styles.player}>
            <Player />
          </div>
          <br /><br />
          <div
            className={this.props.playerDataShow === false ? styles.welcome : styles.hidden}>
            <p>Welcome to the Fantasy Soccer-Football Super League!</p>
            <br />
            <p>You have selected {this.props.fantasyLeagueName}.</p>
          </div>
          <br />
          <div
            className={this.props.playerDataShow === false ? styles.club : styles.hidden}>
            <FantasyClub />
          </div>
        </main>
      );
    }
  }
}

const mapHomeStateToProps = state => (
  {
    accessToken: state.userReducer.accessToken,
    googleId: state.userReducer.googleId,
    displayName: state.userReducer.displayName,
    givenName: state.userReducer.givenName,
    familyName: state.userReducer.familyName,
    userPhoto: state.userReducer.userPhoto,
    fantasyLeagueId: state.userReducer.fantasyLeagueId,
    fantasyLeagueName: state.userReducer.fantasyLeagueName,
    playerDataShow: state.playerReducer.show
  }
);

const LogIn = connect(
  mapHomeStateToProps
)(Home);

export default CSSModules(LogIn, styles);