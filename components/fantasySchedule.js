/* eslint-disable no-unused-vars, no-console*/
// components/fantasySchedule.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasyMatch from './fantasyMatch.js';
import StartingEleven from './startingEleven.js';
import BenchPlayers from './benchPlayers.js';
import Warning from './warning.js';
import { getSchedule } from '../flow/subActions/fantasyScheduleActions.js';
import styles from '../scss/fantasySchedule.scss';

export class Schedule extends React.Component {
	componentDidMount() {
		let goalkeepers = this.props.goalkeepers === undefined ? 0 : this.props.goalkeepers.length,
			defenders = this.props.defenders === undefined ? 0 : this.props.defenders.length,
			midfielders = this.props.midfielders === undefined ? 0 : this.props.midfielders.length,
			forwards = this.props.forwards === undefined ? 0 : this.props.forwards.length,
			rosterLength = goalkeepers + defenders + midfielders + forwards;
		if (rosterLength === 23) {
			this.props.dispatch(getSchedule());
		}
  }
	render() {
		let goalkeepers = this.props.goalkeepers === undefined ? 0 : this.props.goalkeepers.length,
			defenders = this.props.defenders === undefined ? 0 : this.props.defenders.length,
			midfielders = this.props.midfielders === undefined ? 0 : this.props.midfielders.length,
			forwards = this.props.forwards === undefined ? 0 : this.props.forwards.length,
			rosterLength = goalkeepers + defenders + midfielders + forwards;
		return(
			<div
				className={rosterLength < 23 ? styles.hidden : styles.fantasySchedule}>
				<p>Set your lineup for upcoming matches.</p>
				<Warning />
				<div>
					Your Starting 11:
					<StartingEleven />
				</div>
				<div>
					Players Available on Bench (7 required):
					<BenchPlayers />
				</div>
				<FantasyMatch />
			</div>
		);
	}
}

const mapScheduleStateToProps = state => ({
	clubName: state.fantasyClubReducer.clubName,
	goalkeepers: state.fantasyClubReducer.goalkeepers,
	defenders: state.fantasyClubReducer.defenders,
	midfielders: state.fantasyClubReducer.midfielders,
	forwards: state.fantasyClubReducer.forwards,
	accessToken: state.userReducer.accessToken,
	fantasySchedule: state.fantasyScheduleReducer.fantasySchedule
});

const FantasySchedule = connect(
	mapScheduleStateToProps	
)(Schedule);

export default CSSModules(FantasySchedule, styles);