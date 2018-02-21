/*eslint-disable no-console, no-unused-vars*/
// components/playerSelection.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import { fetchLeague, playerPositionSelect, playerClubSelect } from '../flow/subActions/leagueActions.js';
import { addGoalkeeper, addDefender, addMidfielder, addForward } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/playerSelection.scss';

export class Selection extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLeague(this.props.fantasyLeagueId));
  }
  
  handlePositionChange(event) {
    this.props.dispatch(playerPositionSelect(event.target.value));
  }
  
  handleClubChange(event) {
    this.props.dispatch(playerClubSelect(event.target.value));
  }
	
	handleRosterAdd(event) {
		let rosterTotal = this.props.goalkeepers.length + this.props.defenders.length + this.props.midfielders.length + this.props.forwards.length;
		if (rosterTotal < 23) {
			let dataSet = event.target.dataset,
				player = {
					idFromAPI: parseInt(dataSet.id, 10),
					firstName: dataSet.firstname,
					lastName: dataSet.lastname,
					position: dataSet.position,
					clubName: dataSet.clubname,
					fantasyPoints: {
						fixture: parseInt(dataSet.points, 10)
					}
				};
			// in each of the if blocks below, we check for position to add to the correct array, then check that array's length to make sure we are not exceeding the max number of players for that position
			if (player.position === 'G' || player.position === 'Goalkeeper') {
				if (this.props.goalkeepers.length < 4) {
					this.props.dispatch(addGoalkeeper(this.props.accessToken, player));
				}
			}
			if (player.position === 'D' || player.position === 'Defender') {
				if (this.props.defenders.length < 7) {
					this.props.dispatch(addDefender(this.props.accessToken, player));
				}
			}
			if (player.position === 'M' || player.position === 'Midfielder') {
				if (this.props.midfielders.length < 7) {
					this.props.dispatch(addMidfielder(this.props.accessToken, player));
				}
			}
			if (player.position === 'F' || player.position === 'Attacker') {
				if (this.props.forwards.length < 5) {
					this.props.dispatch(addForward(this.props.accessToken, player));
				}
			}
		}
	}
  
  render() {
    if (this.props.playerList) {
      const league = LEAGUE_IDS_NAMES.find(l => l.id === this.props.fantasyLeagueId);
      let rosterLength = this.props.goalkeepers.length + this.props.defenders.length + this.props.midfielders.length + this.props.forwards.length;
      return(
        <div
					className={rosterLength === 23 ? styles.hidden : styles.playerSelection}>
					<h5>You must select 23 players, no more than 4 from any one club.</h5>
					<h5>You must select 4 goalkeepers, 7 defenders, 7 midfielders, and 5 forwards.</h5>
					<h5>Click on a player's name to add them to your roster.</h5>
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
									if (this.props.positionSelection === 'forwards') {
										if (player.position === 'F' || player.position === 'Attacker') {
											return true;
										}
									}
									if (this.props.positionSelection === 'midfielders') {
										if (player.position === 'M' || player.position === 'Midfielder') {
											return true;
										}
									}
									if (this.props.positionSelection === 'defenders') {
										if (player.position === 'D' || player.position === 'Defender') {
											return true;
										}
									}
									if (this.props.positionSelection === 'goalkeepers') {
										if (player.position === 'G' || player.position === 'Goalkeeper') {
											return true;
										}
									}
									if (this.props.positionSelection === 'allPositions') {
										return true;
									}
								})
								.filter(player => {
									if (this.props.clubSelection === player.clubName) {
										return true;
									}
									if (this.props.clubSelection === 'allClubs') {
										return true;
									}
								})
								.map(p => {
									// creating a table row for each player that makes it through the filters
									return(
										<tr
											key={p.idFromAPI}>
											<td
												className={styles.playerName}
												data-id={p.idFromAPI}
												data-firstname={p.firstName}
												data-lastname={p.lastName}
												data-position={p.position}
												data-clubname={p.clubName}
												data-points={p.fantasyPoints.fixture}
												onClick={this.handleRosterAdd.bind(this)}>
												{`${p.firstName} ${p.lastName}`}
											</td>
											<td>
												{p.position}
											</td>
											<td>
												{p.clubName}
											</td>
											<td>
												{p.fantasyPoints.fixture}
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
    else {
      return(
        <p>We're sorry, but something went wrong.</p>
      );
    }
  }
}

const mapSelectionStateToProps = state => ({
  accessToken: state.userReducer.accessToken,
  fantasyLeagueId: state.userReducer.fantasyLeagueId,
  playerList: state.leagueReducer.playerList,
  positionSelection: state.leagueReducer.position,
  clubSelection: state.leagueReducer.club,
  goalkeepers: state.fantasyClubReducer.goalkeepers,
  defenders: state.fantasyClubReducer.defenders,
  midfielders: state.fantasyClubReducer.midfielders,
  forwards: state.fantasyClubReducer.forwards
});

const PlayerSelction = connect(
  mapSelectionStateToProps
)(Selection);

export default CSSModules(PlayerSelction, styles);