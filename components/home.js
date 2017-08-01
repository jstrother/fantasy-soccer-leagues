// components/home.js
// imported into ./app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import { fetchUser } from '../flow/subActions/userActions.js';

import FantasyClub from './fantasyClub.js';
import FantasyLeague from './fantasyLeague.js';
// import FantasyChampsLeague from './fantasyChampsLeague.js';
import LoginPage from './loginPage.js';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 8
    };
  }
  
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  
  selectLeagueChange() {/* this function is to use the menu item value as the leagueId needed in state */}
  
  render() {
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
    } else if (this.props.currentUser && !this.props.leagueId) {
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
              onChange={this.selectLeagueChange}>
              <MenuItem value={8} primaryText="Premiere League (England)" />
              <MenuItem value={9} primaryText="Championship (England)" />
              <MenuItem value={12} primaryText="League One (England)" />
              <MenuItem value={14} primaryText="League Two (England)" />
              <MenuItem value={72} primaryText="Eredivise (Netherlands)" />
              <MenuItem value={74} primaryText="Eerste Divisie (Netherlands)" />
              <MenuItem value={82} primaryText="Bundesliga (Germany)" />
              <MenuItem value={85} primaryText="2.Bundesliga (Germany)" />
              <MenuItem value={181} primaryText="Bundesliga (Austria)" />
              <MenuItem value={208} primaryText="Jupiler Pro League (Belgium)" />
              <MenuItem value={271} primaryText="Superliga (Denmark)" />
              <MenuItem value={301} primaryText="Ligue 1 (France)" />
              <MenuItem value={304} primaryText="Ligue 2 (France)" />
              <MenuItem value={325} primaryText="Super League (Greece)" />
              <MenuItem value={345} primaryText="Urvalsdeild (Iceland)" />
              <MenuItem value={360} primaryText="Premiere Division (Ireland)" />
              <MenuItem value={384} primaryText="Serie A (Italy)" />
              <MenuItem value={387} primaryText="Serie B (Italy)" />
              <MenuItem value={438} primaryText="Premiership (Northern Ireland)" />
              <MenuItem value={444} primaryText="Tippeligaen (Norway)" />
              <MenuItem value={453} primaryText="Ekstraklasa (Poland)" />
              <MenuItem value={462} primaryText="Primeira Liga (Portugal)" />
              <MenuItem value={486} primaryText="Premiere League (Russia)" />
              <MenuItem value={501} primaryText="Premiership (Scotland)" />
              <MenuItem value={504} primaryText="Championship (Scotland)" />
              <MenuItem value={564} primaryText="La Liga (Spain)" />
              <MenuItem value={567} primaryText="Segunda Division (Spain)" />
              <MenuItem value={573} primaryText="Allsvenskan (Sweden)" />
              <MenuItem value={579} primaryText="Superettan (Sweden)" />
              <MenuItem value={591} primaryText="Super League (Switzerland)" />
              <MenuItem value={600} primaryText="Super Lig (Turkey)" />
              <MenuItem value={624} primaryText="Premiere League (Wales)" />
              <MenuItem value={636} primaryText="Primera Division (Argentina)" />
              <MenuItem value={639} primaryText="Primera B (Argentina)" />
              <MenuItem value={648} primaryText="Serie A (Brazil)" />
              <MenuItem value={651} primaryText="Serie B (Brazil)" />
              <MenuItem value={663} primaryText="Primera Division (Chile)" />
              <MenuItem value={672} primaryText="Primera A: Apertura (Colombia)" />
              <MenuItem value={675} primaryText="Primera A: Clausura (Colombia)" />
              <MenuItem value={693} primaryText="Primera A: Apertura (Ecuador)" />
              <MenuItem value={696} primaryText="Primera A: Clausura (Ecuador)" />
              <MenuItem value={743} primaryText="Liga MX (Mexico)" />
              <MenuItem value={779} primaryText="Major League Soccer (USA)" />
              <MenuItem value={968} primaryText="J-League (Japan)" />
              <MenuItem value={989} primaryText="Super League (China)" />
              <MenuItem value={1007} primaryText="Indian Super League (India)" />
              <MenuItem value={1098} primaryText="Liga de Futbol Profesional (Bolivia)" />
              <MenuItem value={1356} primaryText="A-League (Australia)" />
            </DropDownMenu>
          </div>
          <FantasyClub />
          <FantasyLeague />
        </div>
      );
    } else if (this.props.currentUser && this.props.leagueId) {
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
            Your fantasy league is based on {this.props.leagueName}.
          </div>
          <FantasyClub />
          <FantasyLeague />
        </div>
      );
    }
  }
}

const mapHomeStateToProps = state => ({
  currentUser: state.loginReducer.currentUser,
  leagueId: state.leagueSelectionReducer.leagueId,
  leagueName: state.leagueSelectionReducer.leagueName
});

const LogIn = connect(
  mapHomeStateToProps
)(Home);

export default LogIn;