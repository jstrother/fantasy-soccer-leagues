// components/user.js
// imported into fantasyGame.js

import React from 'react';
import FantasyClub from './fantasyClub.js';
import Schedule from './schedule.js';
import FantasySchedule from './fantasySchedule.js';
import FantasyLeague from './fantasyLeague.js';
import FantasyChampsLeague from './fantasyChampsLeague.js';

export default class User extends React.component {
	render() {
		return(
			<div>
				<FantasyClub />
				<FantasySchedule />
				<FantasyLeague />
				<FantasyChampsLeague />
				<Schedule />
			</div>
		);
	}
}