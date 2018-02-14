/* eslint-disable no-console, no-unused-vars*/
// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PlayerSelction from './playerSelection.js';
import RosterDisplay from './rosterDisplay.js';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import { fetchLeague, playerPositionSelect, playerClubSelect } from '../flow/subActions/leagueActions.js';
import { fetchStarter, fetchBenchwarmer, fetchReserve } from '../flow/subActions/playerActions.js';
import { getClub } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/roster.scss';

export class Team extends React.Component {
	componentDidMount() {
		this.props.dispatch(getClub(this.props.accessToken));
	}
	
	render() {
		return(
			<div
				className={styles.rosterComponent}>
				<PlayerSelction />
				<RosterDisplay />
			</div>
		);
	}
}

const mapRosterStateToProps = state => ({
	accessToken: state.userReducer.accessToken
});

const Roster = connect(
	mapRosterStateToProps	
)(Team);

export default CSSModules(Roster, styles);