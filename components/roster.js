// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn } from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
// create a 'QuickPlayer' component that displays name, position, team, and points, no need to display all of a player's stats.  That can be achieved by clicking on a player's name and being taken to a page displaying full info

export class Team extends React.Component {
	// need a function to search by leagueId to get list of correct players to choose roster from - the leagueId will be in state already
	
	// this.props.dispatch(fetchStarter(thisStarter));
	// this.props.dispatch(fetchBencher(thisBencher));
	// this.props.dispatch(fetchReserve(thisReserve));
	
	// handleChange function
	// setStarterClick function
	// setBencherClick function
	// setReserveClick function
	
	render() {
		return(
			<div>
				<DropDownMenu value={0} onChange={this.handleChange}>
          {/* need to pull players from db based upon leagueId and then display as menu items */}
        </DropDownMenu>
        {/* need three buttons to set a player as either starter, bencher, or reserve */}
				<div>Starting 11:</div>
				{/* set up a table to list players chosen for this section */}
				<div>MatchDay Roster:</div>
				{/* set up a table to list players chosen for this section */}
				<div>First Team Roster:</div>
				{/* set up a table to list players chosen for this section */}
			</div>
		);
	}
}

const mapRosterStateToProps = state => ({
  thisStarter: state.updateRosterReducer.thisStarter,
  thisBencher: state.updateRosterReducer.thisBencher,
  thisReserve: state.updateRosterReducer.thisReserve
});

const Roster = connect(
	mapRosterStateToProps	
)(Team);

export default Roster;

// need a roster selector

// starters -11
// benchers -7
// reserves -4