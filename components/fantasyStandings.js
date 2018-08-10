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
				<div>
					Fantasy League Standings:
					<table>
						<thead>
							<tr>
								<th>Position</th>
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
							{
								this.props.currentStandings
								.map(club => {
									return(
										<tr
											key={club._id}
											id={`club-${club.clubName}`}>
											<td>
											</td>
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
	currentStandings: state.leagueStandingsReducer.currentStandings
});

const FantasyStandings = connect(
	mapStandingsStateToProps
)(FantasyTable);

export default CSSModules(FantasyStandings, styles);