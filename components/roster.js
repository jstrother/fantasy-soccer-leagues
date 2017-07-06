// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import StarterList from './starter-list.js';
import BenchPlayerList from './bench-players.js';
import ReservePlayerList from './reserve-players.js';

export default class Roster extends React.Component {
	render() {
		return(
			<div>
				<StarterList />
				<BenchPlayerList />
				<ReservePlayerList />
			</div>
		);
	}
}

// need a roster selector

// starters -11
// benchers -18
// reserves -22