// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import Player from './player.js';

export default class Roster extends React.Component {
	render() {
		return(
			<div>
				<Player /> {/* map over player with name, position, club, f-points */}
			</div>
		);
	}
}