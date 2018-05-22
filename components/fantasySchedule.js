/* eslint-disable no-unused-vars, no-console*/
// components/fantasySchedule.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ScheduleDisplay from './scheduleDisplay.js';
import StartingEleven from './startingEleven.js';
import BenchPlayers from './benchPlayers.js';
import Warning from './warning.js';
import { createSchedule, wasScheduleCreated, matchResolve } from '../flow/subActions/fantasyScheduleActions.js';
import { getClub } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/fantasySchedule.scss';

export class Schedule extends React.Component {
	componentDidMount() {
		if (this.props.starters.length + this.props.benchwarmers.length === 18) {
      this.props.dispatch(matchResolve());
    }
	}
	componentDidUpdate() {
		this.props.dispatch(wasScheduleCreated());
		let rosterLength = this.props.goalkeepers.length + this.props.defenders.length + this.props.midfielders.length + this.props.forwards.length;
		if (Object.keys(this.props.fantasySchedule).length === 0 && rosterLength === 23) {
			if (this.props.scheduleUpdate === false && this.props.scheduleCreated === false) {
				this.props.dispatch(createSchedule());
				this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
			}
			if (this.props.starters.length + this.props.benchwarmers.length === 18) {
        this.props.dispatch(matchResolve());
			}
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
	userId: state.userReducer.userId,
	accessToken: state.userReducer.accessToken,
	clubName: state.fantasyClubReducer.clubName,
	goalkeepers: state.fantasyClubReducer.goalkeepers,
	defenders: state.fantasyClubReducer.defenders,
	midfielders: state.fantasyClubReducer.midfielders,
	forwards: state.fantasyClubReducer.forwards,
	starters: state.fantasyClubReducer.starters,
	benchwarmers: state.fantasyClubReducer.benchwarmers,
	fantasySchedule: state.fantasyScheduleReducer.fantasySchedule,
	leagueScheduleId: state.fantasyClubReducer.leagueScheduleId,
	scheduleCreated: state.fantasyScheduleReducer.scheduleCreated,
	scheduleUpdate: state.fantasyScheduleReducer.scheduleUpdate
});

const FantasySchedule = connect(
	mapScheduleStateToProps	
)(Schedule);

export default CSSModules(FantasySchedule, styles);