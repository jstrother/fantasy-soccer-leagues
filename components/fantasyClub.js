/* eslint-disable no-unused-vars*/
// components/fantasyClub.js
// imported into home.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasySchedule from './fantasySchedule.js';
import Roster from './roster.js';
import styles from '../scss/fantasyClub.scss';

export class FantasyClub extends React.Component {
	render() {
		return(
			<div>
				<div>
					Select players for your roster.
					<Roster />
				</div>
				<div>
					Set your lineup for upcoming matches.
					<FantasySchedule /> {/* covers league matches within a division and the cup matches between all teams in all divisions */}
				</div>
			</div>
		);
	}
}

export default CSSModules(FantasyClub, styles);