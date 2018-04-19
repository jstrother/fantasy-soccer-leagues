/* eslint-disable no-console, no-unused-vars*/
// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PlayerSelection from './playerSelection.js';
import RosterDisplay from './rosterDisplay.js';
import styles from '../scss/roster.scss';

export class Roster extends React.Component {
	render() {
		return(
			<div
				className={styles.rosterComponent}>
				<PlayerSelection />
				<RosterDisplay />
			</div>
		);
	}
}

export default CSSModules(Roster, styles);