/* eslint-disable no-console, no-unused-vars*/
// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PlayerSelection from './playerSelection.js';
import RosterDisplay from './rosterDisplay.js';
import styles from '../scss/roster.scss';

export class TeamRoster extends React.Component {
	render() {
		return(
			<div
				className={this.props.rosterVisible ? styles.rosterComponent : styles.hidden}>
				<PlayerSelection />
				<RosterDisplay />
			</div>
		);
	}
}

const mapRosterStateToProps = state => (
	{
		rosterVisible: state.displayReducer.rosterVisible
	}
);

const Roster = connect(mapRosterStateToProps)(TeamRoster);

export default CSSModules(Roster, styles);