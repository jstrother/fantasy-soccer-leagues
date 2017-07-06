

import React from 'react';
import Player from './player.js';

export default class BenchPlayerList extends React.Component {
	render() {
		return(
			<div>
				<Player /> {/* map over player with name, position, club, stats, active this week, f-points */}
			</div>
		);
	}
}