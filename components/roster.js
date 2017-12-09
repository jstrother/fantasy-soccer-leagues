// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn } from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class Team extends React.Component {
	// need a function to search by leagueId to get list of correct players to choose roster from - the leagueId will be in state already
	
	// handleChange function
	
	render() {
		return(
			<div>
				<div>
					{/*set up a table here that lists all players in selected league. column headers can be used (as drop down menus) to limit to a certain position or team for easier readability and selection*/}
					<h6>You must select 23 players, no more than 4 from any one club.</h6>
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
  // use leagueId already in state to pull correct players from database
});

const Roster = connect(
	mapRosterStateToProps	
)(Team);

export default Roster;