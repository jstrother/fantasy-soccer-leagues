// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { fetchLeague } from '../flow/subActions/leagueActions.js';
import { fetchStarter, fetchBenchwarmer, fetchReserve } from '../flow/subActions/playerActions.js';
import styles from '../scss/roster.scss';

export class Team extends React.Component {
	// using fantasyLeagueId, display list of players from that league
	
	
	// handleChange functions
	
	render() {
		return(
			<div>
				<div>
					<h5>You must select 23 players, no more than 4 from any one club.</h5>
					{/*set up a table here that lists all players in selected league. column headers can be used (as drop down menus) to limit to a certain position or team for easier readability and selection. column headers will be "fullName position clubName"*/}
				</div>
				<div>
					Roster:
					{/* set up a table to list players chosen for this section */}
				</div>
			</div>
		);
	}
}

const mapRosterStateToProps = state => ({
  fantasyLeagueId: state.loginReducer.fantasyLeagueId
});

const Roster = connect(
	mapRosterStateToProps	
)(Team);

export default CSSModules(Roster, styles);