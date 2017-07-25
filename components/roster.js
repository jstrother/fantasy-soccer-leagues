// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn } from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Player from './player.js';

class Team extends React.Component {
	// this.props.dispatch(fetchStarter(fantasyClub, thisStarter));
	// this.props.dispatch(fetchBencher(fantasyClub, thisBencher));
	// this.props.dispatch(fetchReserve(fantasyClub, thisReserve));
	
	// handleChange function
	// setStarterClick function
	// setBencherClick function
	// setReserveClick function
	
	render() {
		return(
			<div>
				<DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {/* need to pull players from db based upon leagueId and then display as menu items */}
        </DropDownMenu>
        {/* need three buttons to set a player as either starter, bencher, or reserve */}
				<div>Starting 11:</div>
				{/* set up a table to list players chosen for this section */}
				<div>18-Player MatchDay Roster:</div>
				{/* set up a table to list players chosen for this section */}
				<div>22-Player First Team Roster:</div>
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