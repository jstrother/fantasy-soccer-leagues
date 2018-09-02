/*eslint-disable no-console*/
// components/fantasyStandings.js

import React from 'react';
import { connect } from 'react-redux';
import {leagueStandings} from '../flow/subActions/leagueStandingsActions.js';
import CSSModules from 'react-css-modules';
import styles from '../scss/fantasyStandings.scss';

export class FantasyTable extends React.Component {
	componentDidMount() {
		this.props.dispatch(leagueStandings());
	}
	render() {
		if(this.props.currentStandings) {
			return(
				<div
					className={this.props.standingsVisible ? styles.fantasySchedule : styles.hidden}>
					Fantasy League Standings:
					<table
						className={styles.standingsTable}>
						<thead>
							<tr>
								<th>Club</th>
								<th>GP</th>
								<th>Pts</th>
								<th>W</th>
								<th>D</th>
								<th>L</th>
								<th>GD</th>
								<th>GF</th>
								<th>GA</th>
							</tr>
						</thead>
						<tbody>
							{/*due to the header covering part of the first week's schedule, we are creating a blank row to space out the schedule properly*/}
							<tr
                className={styles.blankRow}></tr>
							{
								this.props.currentStandings
								.map(club => {
									return(
										<tr
											key={club._id}
											id={`club-${club.clubName}`}>
											<td>
												{club.clubName}
											</td>
											<td>
												{club.gamesPlayed}
											</td>
											<td>
												{club.points}
											</td>
											<td>
												{club.wins}
											</td>
											<td>
												{club.draws}
											</td>
											<td>
												{club.losses}
											</td>
											<td>
												{club.goalDifferential}
											</td>
											<td>
												{club.goalsFor}
											</td>
											<td>
												{club.goalsAgainst}
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
			);
		}
		if(!this.props.currentStandings) {
			return(
				<div>
					<p>
						We're sorry, something went wrong.
					</p>
				</div>
			);
		}
	}
}

const mapStandingsStateToProps = state => ({
	currentStandings: state.leagueStandingsReducer.currentStandings,
	standingsVisible: state.displayReducer.standingsVisible
});

const FantasyStandings = connect(
	mapStandingsStateToProps
)(FantasyTable);

export default CSSModules(FantasyStandings, styles);