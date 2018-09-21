/*eslint-disable no-unused-vars, no-console*/
// components/scheduleDisplay.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasyMatch from './fantasyMatch.js';
import { getSchedule } from '../flow/subActions/fantasyScheduleActions.js';
import { getClub } from '../flow/subActions/fantasyClubActions.js';
import { compare } from '../server/programFunctions/compare_function.js';
import { localeDate } from '../server/programFunctions/localeDate_function.js';
import styles from '../scss/scheduleDisplay.scss';

const sevenDays = 1000 * 60 * 60 * 24 * 7,
	today = Date.now();

export class DisplaySchedule extends React.Component {
	componentDidMount() {
		if (this.props.clubFetched === false) {
			this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
		}
		setTimeout(() => {
			if (this.props.leagueScheduleId !== undefined) {
				this.props.dispatch(getSchedule(this.props.leagueScheduleId));
			}
		}, 2000);
	}
	componentDidUpdate() {
		if (!this.props.leagueScheduleId && this.props.clubFetched === false) {
			this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
		}
		if (
			this.props.leagueScheduleId !== undefined &&
			this.props.scheduleFetched === false
		) {
			this.props.dispatch(getSchedule(this.props.leagueScheduleId));
		}
	}

	render() {
		let previousHomeClub,
			previousHomeScore,
			previousAwayClub,
			previousAwayScore,
			previousRoundDates,
			nextHomeClub,
			nextAwayClub,
			nextRoundDates;
		if (this.props.fantasySchedule.weeklyMatches !== undefined) {
			this.props.fantasySchedule.weeklyMatches.forEach(week => {
				const matchDates = new Date(week.datesToRun).getTime();
				if (today - sevenDays <= matchDates && matchDates < today) {
					previousRoundDates = week.datesToRun;
					week.matches.forEach(match => {
						if (
							match.homeClub.manager === this.props.userId ||
							match.awayClub.manager === this.props.userId
						) {
							previousHomeClub = match.homeClub.clubName;
							previousHomeScore = match.homeScore;
							previousAwayClub = match.awayClub.clubName;
							previousAwayScore = match.awayScore;
						}
					});
				}
				if (today <= matchDates && matchDates < today + sevenDays) {
					nextRoundDates = week.datesToRun;
					week.matches.forEach(match => {
						if (
							match.homeClub.manager === this.props.userId ||
							match.awayClub.manager === this.props.userId
						) {
							nextHomeClub = match.homeClub.clubName;
							nextAwayClub = match.awayClub.clubName;
						}
					});
				}
			});
			return (
				<div className={styles.scheduleDisplay}>
					<p className={styles.matchHeader}>Previous Match</p>
					<FantasyMatch
						className={styles.previousMatch}
						homeClub={previousHomeClub}
						awayClub={previousAwayClub}
						homeScore={previousHomeScore}
						awayScore={previousAwayScore}
						matchDate={previousRoundDates}
					/>
					<br />
					<p className={styles.matchHeader}>Next Match</p>
					<FantasyMatch
						className={styles.nextMatch}
						homeClub={nextHomeClub}
						awayClub={nextAwayClub}
						homeScore={null}
						awayScore={null}
						matchDate={nextRoundDates}
					/>
					<br />
					<p className={styles.matchHeader}>Schedule:</p>
					<table className={styles.scheduleTable}>
						<thead>
							<tr>
								<th>Round</th>
								<th>Home</th>
								<th>Away</th>
								<th>Date/Result</th>
							</tr>
						</thead>
						<tbody className={styles.placeHolder}>
							{/*due to the header covering part of the first week's schedule, we are creating a blank row to space out the schedule properly*/}
							<tr className={styles.blankRow} />
						</tbody>
						{this.props.fantasySchedule.weeklyMatches
							// we sort the array to make sure it gets listed 'round 1, round 2, round 3...' and not 'round 12, round 5, round 28...'
							.sort((a, b) => compare(b.roundNumber, a.roundNumber)) // it is this way to sort in ascending order, 1 - 38
							.map(week => {
								const matches = week.matches,
									matchDay = localeDate(week.datesToRun);
								// create a table body for each round of the season
								return (
									<tbody key={week._id} id={`rnd-${week._id}`}>
										<tr>
											<td key={`round${week.roundNumber}`}>
												{`${week.roundNumber}`}
											</td>
											<td />
											<td />
											<td />
										</tr>
										{matches.map(match => {
											if (match.final === false) {
												return (
													<tr key={`${week._id}${match._id}`}>
														<td />
														<td
															key={`${week._id}${match._id}${
																match.homeClub._id
															}`}>
															{match.homeClub.clubName}
														</td>
														<td
															key={`${week._id}${match._id}${
																match.awayClub._id
															}`}>
															{match.awayClub.clubName}
														</td>
														<td key={`${week._id}${match._id}dates`}>
															{matchDay}
														</td>
													</tr>
												);
											}
											if (match.final === true) {
												return (
													<tr key={`${week._id}${match._id}`}>
														<td />
														<td
															key={`${week._id}${match._id}${
																match.homeClub._id
															}`}>
															{match.homeClub.clubName}
														</td>
														<td
															key={`${week._id}${match._id}${
																match.awayClub._id
															}`}>
															{match.awayClub.clubName}
														</td>
														<td key={`${week._id}${match._id}scores`}>
															{match.homeScore}:{match.awayScore}
														</td>
													</tr>
												);
											}
										})}
									</tbody>
								);
							})}
					</table>
				</div>
			);
		} else {
			return (
				<div>
					<p>No schedule yet.</p>
				</div>
			);
		}
	}
}

const mapDisplayStateToProps = state => ({
	userId: state.userReducer.userId,
	fantasySchedule: state.fantasyScheduleReducer.fantasySchedule,
	leagueScheduleId: state.fantasyClubReducer.leagueScheduleId,
	scheduleFetched: state.fantasyScheduleReducer.scheduleFetched,
	clubFetched: state.fantasyClubReducer.clubFetched
});

const ScheduleDisplay = connect(mapDisplayStateToProps)(DisplaySchedule);

export default CSSModules(ScheduleDisplay, styles);
