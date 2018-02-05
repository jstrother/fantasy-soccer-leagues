/* eslint-disable no-console, no-unused-vars*/
// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import { fetchLeague, playerPositionSelect, playerClubSelect } from '../flow/subActions/leagueActions.js';
import { fetchStarter, fetchBenchwarmer, fetchReserve } from '../flow/subActions/playerActions.js';
import { addRoster, getClub } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/roster.scss';

export class Team extends React.Component {
	// using fantasyLeagueId, display list of players from that league
	componentDidMount() {
		console.log('this.props.roster:', this.props.roster);
		console.log('this.props.club:', this.props.club);
		this.props.dispatch(fetchLeague(this.props.fantasyLeagueId));
		this.props.dispatch(getClub(this.props.accessToken));
	}
	
	handlePositionChange(event) {
		this.props.dispatch(playerPositionSelect(event.target.value));
	}
	
	handleClubChange(event) {
		this.props.dispatch(playerClubSelect(event.target.value));
	}
	
	handleRosterAdd(event) {
		console.log('idFromAPI roster.js:', event.target.value);
		this.props.dispatch(addRoster(this.props.accessToken, event.target.value));
	}
	
	handleRosterRemove(event) {
		
	}
	
	render() {
		if (this.props.playerList){
			const league = LEAGUE_IDS_NAMES.find(l => l.id === this.props.fantasyLeagueId);
			return(
				<div
					className={styles.rosterComponent}>
					<div
						className={styles.playerSelection}>
						<h5>You must select 23 players, no more than 4 from any one club.</h5>
						<h5>You must select 4 goalkeepers, 7 defenders, 7 midfielders, and 5 forwards.</h5>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>
										<select
											className={"positionsList"}
											defaultValue={"allPositions"}
											onChange={this.handlePositionChange.bind(this)}>
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
											onChange={this.handleClubChange.bind(this)}>
											<option key={"allClubs"} value={"allClubs"}>All Clubs</option>
											{league.clubs.map(c => (<option key={c.name} value={c.name}>{c.name}</option>))}
										</select>
									</th>
									<th>
										Points Last Match
									</th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.playerList
									.filter(player => {
										// this is a hack to account for the fact that the db doesn't have a consistent method
										if (this.props.position === 'forwards') {
											if (player.position === 'F' || player.position === 'Attacker') {
												return true;
											}
										}
										if (this.props.position === 'midfielders') {
											if (player.position === 'M' || player.position === 'Midfielder') {
												return true;
											}
										}
										if (this.props.position === 'defenders') {
											if (player.position === 'D' || player.position === 'Defender') {
												return true;
											}
										}
										if (this.props.position === 'goalkeepers') {
											if (player.position === 'G' || player.position === 'Goalkeeper') {
												return true;
											}
										}
										if (this.props.position === 'allPositions') {
											return true;
										}
									})
									.filter(player => {
										if (this.props.club === player.clubName) {
											return true;
										}
										if (this.props.club === 'allClubs') {
											return true;
										}
									})
									.map(p => {
										// creating a table row for each player
										return(
											<tr
												value={p.idFromAPI}
												key={p.idFromAPI}
												onClick={this.handleRosterAdd.bind(this)}>
												<td>{`${p.firstName} ${p.lastName}`}</td>
												<td>{p.position}</td>
												<td>{p.clubName}</td>
												<td>{p.fantasyPoints.fixture}</td>
											</tr>
										);
									})
								}
							</tbody>
						</table>
					</div>
					<div
						className={styles.rosterDisplay}>
						Roster:
						<table>
							<thead>
								<tr>
									<th>
										Name
									</th>
									<th>
										Position
									</th>
									<th>
										Club
									</th>
									<th>
										Points Last Match
									</th>
								</tr>
							</thead>
							<tbody>
								{
									// this.props.roster
									// .map(p => {
									// 	return(
									// 		<tr
									// 			value={p.idFromAPI + 1}
									// 			key={p.idFromAPI + 1}
									// 			onClick={this.handleRosterRemove.bind(this)}>
									// 			<td>{`${p.firstName} ${p.lastName}`}</td>
									// 			<td>{p.position}</td>
									// 			<td>{p.clubName}</td>
									// 			<td>{p.fantasyPoints.fixture}</td>
									// 		</tr>
									// 	);
									// })
								}
							</tbody>
						</table>
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
	accessToken: state.userReducer.accessToken,
  fantasyLeagueId: state.userReducer.fantasyLeagueId,
  roster: state.fantasyClubReducer.roster,
  playerList: state.leagueReducer.playerList,
  position: state.leagueReducer.position,
  club: state.leagueReducer.club,
  player: state.playerReducer.player
});

const Roster = connect(
	mapRosterStateToProps	
)(Team);

export default CSSModules(Roster, styles);