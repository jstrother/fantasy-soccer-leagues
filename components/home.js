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

console.log(LEAGUE_IDS_NAMES[0][0]);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 8
    }; // move this abililty into the redux portion of the code to make this component as stateless as possible
  }
  
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
    
    if (this.props.currentUser && !this.props.currentUser.basisLeagueId) {
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
              value={this.state.value}
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
    
    if (this.props.currentUser && this.props.currentUser.basisLeague.leagueId) {
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
            Your fantasy league is based on {this.props.currentUser.basisLeague.leagueName}.
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