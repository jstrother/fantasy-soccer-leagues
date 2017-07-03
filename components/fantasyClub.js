// components/fantasyClub.js
// imported into user.js

import React from 'react';
import Roster from './roster.js';
import FantasySchedule from './fantasySchedule.js';

export default class FantasyClub extends React.Component {
	render() {
		return(
			<div>
				<div>
					Check and update your roster.
					<Roster />
				</div>
				<div>
					Set your lineup for upcoming matches.
					<FantasySchedule />
				</div>
			</div>
		);
	}
}