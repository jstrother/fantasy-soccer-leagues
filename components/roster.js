/* eslint-disable no-console, no-unused-vars*/
// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import { fetchLeague } from '../flow/subActions/leagueActions.js';
import { fetchStarter, fetchBenchwarmer, fetchReserve } from '../flow/subActions/playerActions.js';
import styles from '../scss/roster.scss';



export class Team extends React.Component {
	// using fantasyLeagueId, display list of players from that league
	componentDidMount() {
		this.props.dispatch(fetchLeague(this.props.fantasyLeagueId));
	}
	
	// handleChange functions
	handlePositionChange(event) {
		
	}
	
	handleClubChange(event) {
		
	}
	
	render() {
		if (this.props.players) {
			const league = LEAGUE_IDS_NAMES.find(l => l.id === this.props.fantasyLeagueId);
			return(
				<div>
					{console.log('roster.js players:', this.props.players)}
					<div>
						<h5>You must select 23 players, no more than 4 from any one club.</h5>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>
										<select
											className={'positionsList'}
											defaultValue={"allPositions"}
											onChange={this.handlePositionChange}>
											<option key={"1"} value={"allPositions"}>All Positions</option>
											<option key={"2"} value={"forwards"}>Forwards</option>
											<option key={"3"} value={"midfielders"}>Midfielders</option>
											<option key={"4"} value={"defenders"}>Defenders</option>
											<option key={"5"} value={"goalkeepers"}>Goalkeepers</option>
										</select>
									</th>
									<th>
										<select
											className={"clubsList"}
											defaultValue={"allClubs"}
											onChange={this.handleClubChange}>
											<option key={"allClubs"} value={"allClubs"}>All Clubs</option>
											{league.clubs.map(c => (<option key={c.name} value={c.name}>{c.name}</option>))}
										</select>
									</th>
								</tr>
							</thead>
							<tbody>
								
							</tbody>
						</table>
					</div>
					<div>
						Roster:
						{/* set up a table to list players chosen for this section */}
					</div>
				</div>
			);
		} else {
			return(
				<div>
					<p>We are sorry, but something went wrong.  Please try again later.</p>
				</div>
			);
		}
	}
}

const mapRosterStateToProps = state => ({
  fantasyLeagueId: state.userReducer.fantasyLeagueId,
  players: state.leagueReducer.players
});

const Roster = connect(
	mapRosterStateToProps	
)(Team);

export default CSSModules(Roster, styles);