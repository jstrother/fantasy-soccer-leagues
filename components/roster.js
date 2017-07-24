// components/roster.js
// imported into fantasyClub.js

import React from 'react';

import Player from './player.js';

export default class Roster extends React.Component {
	// this.props.dispatch(fetchStarter(fantasyClub, thisStarter));
	// this.props.dispatch(fetchBencher(fantasyClub, thisBencher));
	// this.props.dispatch(fetchReserve(fantasyClub, thisReserve));
	// this.props.dispatch(fetchSubstitute(fantasyClub, thisSubstitute));
	
	render() {
		return(
			<div>
				<div>Starting 11:</div>
				<div>18-Player MatchDay Roster:</div>
				<div>22-Player First Team Roster:</div>
			</div>
		);
	}
}

const mapRosterStateToProps = state => ({
  thisStarter: state.updateRosterReducer.thisStarter,
  thisBencher: state.updateRosterReducer.thisBencher,
  thisReserve: state.updateRosterReducer.thisReserve,
  thisSubstitute: state.updateRosterReducer.thisSubstitute
});

// need a roster selector

// starters -11
// benchers -7
// reserves -4