// components/fantasySchedule.js

import React from 'react';
import FantasyMatch from './fantasyMatch.js';

export default class FantasySchedule extends React.Component {
	render() {
		return(
			<div>
				<div>
					Set your Matchday Roster:
				</div>
				<div>
					Select your Starting 11:
				</div>
				<FantasyMatch />
			</div>
		);
	}
}