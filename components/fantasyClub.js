// components/fantasyClub.js
// imported into user.js

import React from 'react';
import Roster from './roster.js';

export default class FantasyClub extends React.Component {
	render() {
		return(
			<div>
				<Roster />
			</div>
		);
	}
}