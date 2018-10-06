/*eslint-disable no-console, no-unused-vars*/
// components/playerSelection.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import Warning from './warning.js';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import { fetchLeague, playerPositionSelect, playerClubSelect } from '../flow/subActions/leagueActions.js';
import { addGoalkeeper, addDefender, addMidfielder, addForward } from '../flow/subActions/fantasyClubActions.js';
import { warning } from '../flow/subActions/warningActions.js';
import { compare } from '../server/programFunctions/compare_function.js';
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
		if (this.props.userId === this.props.managerId) {
			let rosterTotal = this.props.goalkeepers.length + this.props.defenders.length + this.props.midfielders.length + this.props.forwards.length,
				dataSet = event.target.dataset,
				player = {
					idFromAPI: parseInt(dataSet.id, 10),
					// note: the dataSet dot notation does not use camelCase
					firstName: dataSet.firstname, 
					lastName: dataSet.lastname,
					position: dataSet.position,
					clubName: dataSet.clubname,
					fantasyPoints: {
						fixture: parseInt(dataSet.points, 10)
					}
				},
				roster = [],
				clubCount = [],
				scheduleLength = this.props.fantasySchedule === undefined ? 0 : this.props.fantasySchedule.length;
			// we need a full list of players already selected to help check for number of times any particular clubName shows up (max 4 per clubName)
			roster.push.apply(roster, this.props.goalkeepers);
			roster.push.apply(roster, this.props.defenders);
			roster.push.apply(roster, this.props.midfielders);
			roster.push.apply(roster, this.props.forwards);
			
			clubCount = roster.filter(p => {
				if (player.clubName === p.clubName) {
					return true;
				}
			});
			
			// we first check to see if there are less than 4 instances of a particular clubName as a user can only have a max of 4 players from any one clubName
			if (clubCount.length < 4) {
				// next, check to see if the roster has room for new players
				if (rosterTotal < 23) {
					// in each of the if blocks below, we check for position to add to the correct array, then check that array's length to make sure we are not exceeding the max number of players for that position
					if (player.position === 'G' || player.position === 'Goalkeeper') {
						positionChecker(player, this.props.goalkeepers, addGoalkeeper, 'goalkeeper', 4, this.props.dispatch, this.props.accessToken, this.props.userId);
					}
					if (player.position === 'D' || player.position === 'Defender') {
						positionChecker(player, this.props.defenders, addDefender, 'defender', 7, this.props.dispatch, this.props.accessToken, this.props.userId);
					}
					if (player.position === 'M' || player.position === 'Midfielder') {
						positionChecker(player, this.props.midfielders, addMidfielder, 'midfielder', 7, this.props.dispatch, this.props.accessToken, this.props.userId);
					}
					if (player.position === 'F' || player.position === 'Attacker') {
						positionChecker(player, this.props.forwards, addForward, 'forward', 5, this.props.dispatch, this.props.accessToken, this.props.userId);
					}
				}
			}
			else {
				this.props.dispatch(warning(`You have reached the maximum number of players from ${player.clubName}.`));
			}
		}
		
		function positionChecker(playerArg, positionProps, positionAsyncAdd, positionName, maxLength, dispatch, accessToken, userId) {
			if (positionProps.length < maxLength) {
				// this filter function checks to see if the player is already on the roster
				let positionCheck = positionProps.filter(p => {
					if (playerArg.idFromAPI === p.idFromAPI) {
						dispatch(warning('This player is already on your roster.'));
						return true;
					}
				});
				if (positionCheck.length === 0) {
					dispatch(positionAsyncAdd(accessToken, userId, playerArg));
				}
			}
			else {
				dispatch(warning(`You have reached the maximum number of ${positionName}s.`));
			}
		}
	}
  
  render() {
    if (this.props.playerList) {
      const league = LEAGUE_IDS_NAMES.find(l => l.id === this.props.fantasyLeagueId);
      let goalkeepers = this.props.goalkeepers === undefined ? 0 : this.props.goalkeepers.length,
				defenders = this.props.defenders === undefined ? 0 : this.props.defenders.length,
				midfielders = this.props.midfielders === undefined ? 0 : this.props.midfielders.length,
				forwards = this.props.forwards === undefined ? 0 : this.props.forwards.length,
				rosterLength = goalkeepers + defenders + midfielders + forwards;
      return(
        <div
					className={rosterLength === 23 ? styles.hidden : styles.playerSelection}>
					<p>Select players for your roster.</p>
					<p>You must select 23 players, no more than 4 from any one club.</p>
					<p>You must select 4 goalkeepers, 7 defenders, 7 midfielders, and 5 forwards.</p>
					<p>Click on a player's name to add them to your roster.</p>
					<Warning />
					<table
						className={styles.playerSelectTable}>
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
								.sort((a,b) => compare(b.clubName, a.clubName) || 
									compare(a.fantasyPoints.fixture, b.fantasyPoints.fixture) || 
									compare(b.position, a.position) ||
									compare(b.lastName, a.lastName) || 
									compare(b.firstName, a.firstName))
								.map(p => {
									// creating a table row for each player that makes it through the filters
									return(
										<tr
											key={p.idFromAPI}
											id={`sel-${p.idFromAPI}`}>
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
	userId: state.userReducer.userId,
	managerId: state.fantasyClubReducer.manager === undefined ? 0 : state.fantasyClubReducer.manager._id,
  accessToken: state.userReducer.accessToken,
  fantasyLeagueId: state.userReducer.fantasyLeagueId,
  playerList: state.leagueReducer.playerList,
  positionSelection: state.leagueReducer.position,
  clubSelection: state.leagueReducer.club,
  goalkeepers: state.fantasyClubReducer.goalkeepers,
  defenders: state.fantasyClubReducer.defenders,
  midfielders: state.fantasyClubReducer.midfielders,
  forwards: state.fantasyClubReducer.forwards,
  clubName: state.fantasyClubReducer.clubName,
  fantasyScheduleReducer: state.fantasyScheduleReducer.fantasySchedule
});

const PlayerSelection = connect(
  mapSelectionStateToProps
)(Selection);

export default CSSModules(PlayerSelection, styles);