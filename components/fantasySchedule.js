/* eslint-disable no-unused-vars, no-console*/
// components/fantasySchedule.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasyMatch from './fantasyMatch.js';
import StartingEleven from './startingEleven.js';
import BenchPlayers from './benchPlayers.js';
import Warning from './warning.js';
import { populateSchedule, populateMatches, createSchedule, getSchedule } from '../flow/subActions/fantasyScheduleActions.js';
import styles from '../scss/fantasySchedule.scss';

export class Schedule extends React.Component {
	componentDidMount() {
		if (this.props.fantasySchedule.matches.length > 0) {
			this.props.dispatch(getSchedule());
		}
    if (this.props.fantasySchedule.matches.length === 0) {
			this.props.dispatch(createSchedule());
		}
		// this.props.dispatch(populateSchedule());
		// this.props.dispatch(populateMatches());
  }
	render() {
		const rosterLength = this.props.goalkeepers.length + this.props.defenders.length + this.props.midfielders.length + this.props.forwards.length;
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
					Players Available on Bench:
					<BenchPlayers />
				</div>
				<FantasyMatch />
			</div>
		);
	}
}

const mapScheduleStateToProps = state => ({
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