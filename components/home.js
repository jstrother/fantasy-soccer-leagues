// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import { fetchUser } from '../flow/subActions/userActions.js';
// import { selectLeague } from '../flow/subActions/leagueSelectionActions.js';

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
    console.log('value:', value);
    this.setState({value}); // move this abililty into the redux portion of the code to make this component as stateless as possible
  }
  
  render() {
    console.log('user', this.props.currentUser);
    if (!this.props.currentUser) {
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
  currentUser: state.loginReducer
});

const LogIn = connect(
  mapHomeStateToProps
)(Home);

export default LogIn;