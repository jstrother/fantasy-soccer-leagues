// components/fantasyClub.js
// imported into user.js

import React from 'react';
import Player from './player.js';
import FantasySchedule from './fantasySchedule.js';
import FantasyLeague from './fantasyLeague.js';
import FantasyChampsLeague from './fantasyChampsLeague.js';

export default class FantasyClub extends React.Component {
	render() {
		return(
			<div>
				<Player />
				<FantasySchedule />
				<FantasyLeague />
				<FantasyChampsLeague />
			</div>
		);
	}
}