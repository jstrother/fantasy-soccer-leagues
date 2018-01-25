/* eslint-disable no-unused-vars*/
// components/fantasySchedule.js

import React from 'react';
import FantasyMatch from './fantasyMatch.js';

export default class FantasySchedule extends React.Component {
	render() {
		return(
			<div>
				<div>
					Select your Starting 11:
				</div>
				<div>
					Select your Matchday 18:
				</div>
				<FantasyMatch />
			</div>
		);
	}
}