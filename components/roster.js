// components/roster.js
// imported into fantasyClub.js

import React from 'react';

import Starters from './starter-list.js';
import Benchers from './bench-players.js';
import Reserves from './reserve-players.js';

export default class Roster extends React.Component {
	
	render() {
		return(
			<div>
				<Starters>
					
				</Starters>
				<Benchers>
					
				</Benchers>
				<Reserves>
					
				</Reserves>
			</div>
		);
	}
}

// need a roster selector

// starters -11
// benchers -7
// reserves -4