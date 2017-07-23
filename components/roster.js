// components/roster.js
// imported into fantasyClub.js

import React from 'react';

import Player from './player.js';

export default class Roster extends React.Component {
	// dispatch a fetchPlayer
	
	
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

// need a roster selector

// starters -11
// benchers -7
// reserves -4