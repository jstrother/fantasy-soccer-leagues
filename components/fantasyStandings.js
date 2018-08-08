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
		console.log('leagueStandings:', this.props.currentStandings);
	}
	render() {
		return(
			<div>
				Fantasy League Standings:
				<table>
					<thead>
						<tr>
							<th>Position</th>
							<th>Club</th>
							<th>GP</th>
							<th>W</th>
							<th>D</th>
							<th>L</th>
							<th>GF</th>
							<th>GA</th>
							<th>GD</th>
							<th>Pts</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStandingsStateToProps = state => ({
	currentStandings: state.leagueStandingsReducer.currentStandings
});

const FantasyStandings = connect(
	mapStandingsStateToProps
)(FantasyTable);

export default CSSModules(FantasyStandings, styles);