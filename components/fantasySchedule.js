/* eslint-disable no-unused-vars, no-console*/
// components/fantasySchedule.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ScheduleDisplay from './scheduleDisplay.js';
import StartingEleven from './startingEleven.js';
import BenchPlayers from './benchPlayers.js';
import Warning from './warning.js';
import { getSchedule, createSchedule } from '../flow/subActions/fantasyScheduleActions.js';
import { matchResolve } from '../flow/subActions/fantasyScheduleActions.js';
import styles from '../scss/fantasySchedule.scss';

export class Schedule extends React.Component {
	componentDidMount() {
		if (this.props.fantasySchedule.weeklyMatches.length > 0) {
			this.props.dispatch(matchResolve());
		}
	}
	componentDidUpdate() {
			let rosterLength = this.props.goalkeepers.length + this.props.defenders.length + this.props.midfielders.length + this.props.forwards.length;
		console.log('fsComponent goalkeepers:', this.props.goalkeepers.length);
		console.log('fsComponent defenders:', this.props.defenders.length);
		console.log('fsComponent midfielders:', this.props.midfielders.length);
		console.log('fsComponent forwards:', this.props.forwards.length);
		console.log('fsComponent fantasySchedule:', this.props.fantasySchedule);
		console.log('fsComponent scheduleLength:', this.props.weeklyMatches.length);
		console.log('fsComponent rosterLength:', rosterLength);
		console.log('fsComponent conditional:', rosterLength === 23 && this.props.weeklyMatches.length === 0);
		if (rosterLength === 23 && this.props.weeklyMatches.length === 0) {
			this.props.dispatch(createSchedule());
			this.props.dispatch(getSchedule());
		}
	}
	render() {
		let rosterLength = this.props.goalkeepers.length + this.props.defenders.length + this.props.midfielders.length + this.props.forwards.length;
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
				<ScheduleDisplay />
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
	fantasySchedule: state.fantasyScheduleReducer.fantasySchedule,
	weeklyMatches: state.fantasyScheduleReducer.fantasySchedule.weeklyMatches
});

const FantasySchedule = connect(
	mapScheduleStateToProps	
)(Schedule);

export default CSSModules(FantasySchedule, styles);