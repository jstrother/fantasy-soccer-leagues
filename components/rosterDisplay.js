/*eslint-disable no-console, no-unused-vars*/
// components/rosterDisplay.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import StartingEleven from './startingEleven.js';
import BenchPlayers from './benchPlayers.js';
import Warning from './warning.js';
import CSSModules from 'react-css-modules';
import { removeGoalkeeper, removeDefender, removeMidfielder, removeForward, addStarter, addBench, removeStarter, removeBench } from '../flow/subActions/fantasyClubActions.js';
import { warning } from '../flow/subActions/warningActions.js';
import { fetchPlayerData } from '../flow/subActions/playerActions.js';
import styles from '../scss/rosterDisplay.scss';

export class Display extends React.Component {
  handleRosterRemove(event) {
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
		
		if (player.position === 'G' || player.position === 'Goalkeeper') {
			this.props.dispatch(removeGoalkeeper(this.props.accessToken, this.props.userId, player));
		}
		if (player.position === 'D' || player.position === 'Defender') {
			this.props.dispatch(removeDefender(this.props.accessToken, this.props.userId, player));
		}
		if (player.position === 'M' || player.position === 'Midfielder') {
			this.props.dispatch(removeMidfielder(this.props.accessToken, this.props.userId, player));
		}
		if (player.position === 'F' || player.position === 'Attacker') {
			this.props.dispatch(removeForward(this.props.accessToken, this.props.userId, player));
		}
		this.props.starters.filter(p => {
			let sListId = parseInt(p.idFromAPI, 10);
			if (sListId === player.idFromAPI) {
				this.props.dispatch(removeStarter(this.props.accessToken, this.props.userId, p));
			}
		});
		this.props.benchwarmers.filter(p => {
			let bListId = parseInt(p.idFromAPI, 10);
			if (bListId === player.idFromAPI) {
				this.props.dispatch(removeBench(this.props.accessToken, this.props.userId, p));
			}
		});
  }
  
	addStartingPlayer(event) {
		let dataSet = event.target.dataset,
			player = {
				idFromAPI: parseInt(dataSet.id, 10),
				firstName: dataSet.firstname, // note: the dataSet dot notation does not use camelCase
				lastName: dataSet.lastname, // note: the dataSet dot notation does not use camelCase
				position: dataSet.position,
				clubName: dataSet.clubname, // note: the dataSet dot notation does not use camelCase
				fantasyPoints: {
					fixture: parseInt(dataSet.points, 10)
				}
			};
		
		if (this.props.starters && this.props.starters.length < 11) {
			// checking whether player is already a bench player, can't have a player be a starter and on bench at same time
			let benchPlayerCheck = this.props.benchwarmers.filter(benchPlayer => {
				if (player.idFromAPI === benchPlayer.idFromAPI) {
					this.props.dispatch(warning('This player is already on your bench.'));
					return true;
				}
			});
			// if the player is not a bench player, then benchPlayerCheck will not have anything in it and a length of 0
			if (benchPlayerCheck.length === 0) {
				this.props.dispatch(addStarter(this.props.accessToken, this.props.userId, player));
			}
		} else {
			this.props.dispatch(warning('You already have 11 starters.'));
		}
	}
	
	addBenchPlayer(event) {
		let dataSet = event.target.dataset,
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
			};
		
		if (this.props.benchwarmers && this.props.benchwarmers.length < 7 ) {
			// checking whether player is already a starter, can't have a player be a starter and on bench at same time
			let starterCheck = this.props.starters.filter(starter => {
				if (player.idFromAPI === starter.idFromAPI) {
					this.props.dispatch(warning('This player is already in your starting eleven.'));
					return true;
				}
			});
			// if the player is not a starter, then starterCheck will not have anything in it and a length of 0
			if (starterCheck.length === 0) {
				this.props.dispatch(addBench(this.props.accessToken, this.props.userId, player));
			}
		} else {
			this.props.dispatch(warning('You already have 7 players on the bench.'));
		}
	}
	
	showPlayerStats(event) {
		let playerId = parseInt(event.target.dataset.id, 10);
		this.props.dispatch(fetchPlayerData(this.props.accessToken, playerId));
	}
  
  render() {
		// this is to create a single list to more easily map over in tbody below
		let roster = [];
		roster.push.apply(roster, this.props.goalkeepers);
		roster.push.apply(roster, this.props.defenders);
		roster.push.apply(roster, this.props.midfielders);
		roster.push.apply(roster, this.props.forwards);
		console.log('roster length:', roster.length);
    return(
      <div
				className={styles.rosterDisplay}>
				<div
					className={styles.completeRoster}>
					Roster:
					<p>Click on a player's name to view their stats.</p>
					<table
						className={styles.rosterTable}>
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
								<th>
									Starter?
								</th>
								<th>
									Reserve?
								</th>
								<th>
									Remove?
								</th>
							</tr>
						</thead>
						<tbody>
							{
								roster
								.map(p => {
									return(
										<tr
											id={`ros-${p.idFromAPI}`}
											key={`key-${p.idFromAPI}`}>
											<td
												className={styles.clickable}
												data-id={p.idFromAPI}
												onClick={this.showPlayerStats.bind(this)}>
												{`${p.firstName} ${p.lastName}`}
											</td>
											<td>
												{`${p.position}`}
											</td>
											<td>
												{`${p.clubName}`}
											</td>
											<td>
												{`${p.fantasyPoints.fixture}`}
											</td>
											<td
												className={styles.clickable}
												data-id={p.idFromAPI}
												data-firstname={p.firstName}
												data-lastname={p.lastName}
												data-position={p.position}
												data-points={p.fantasyPoints.fixture}
												onClick={this.addStartingPlayer.bind(this)}>
												Starter
											</td>
											<td
												className={styles.clickable}
												data-id={p.idFromAPI}
												data-firstname={p.firstName}
												data-lastname={p.lastName}
												data-position={p.position}
												data-points={p.fantasyPoints.fixture}
												onClick={this.addBenchPlayer.bind(this)}>
												Reserve
											</td>
											<td
												className={styles.clickable}
												data-id={p.idFromAPI}
												data-firstname={p.firstName}
												data-lastname={p.lastName}
												data-position={p.position}
												data-clubname={p.clubName}
												data-points={p.fantasyPoints.fixture}
												onClick={this.handleRosterRemove.bind(this)}>
												Remove
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
				<div
					className={this.props.starters.length + this.props.benchwarmers.length === 0 ? styles.hidden : styles.lineup}>
					<p>Set your lineup for upcoming matches.</p>
					<Warning />
					<div
						className={styles.startingEleven}>
						Your 11 Starters:
						<StartingEleven />
					</div>
					<div
						className={styles.benchPlayers}>
						Your 7 Reserves:
						<BenchPlayers />
					</div>
				</div>
			</div>
    );
  }
}

const mapDisplayStateToProps = state => ({
	userId: state.userReducer.userId,
  accessToken: state.userReducer.accessToken,
  goalkeepers: state.fantasyClubReducer.goalkeepers,
  defenders: state.fantasyClubReducer.defenders,
  midfielders: state.fantasyClubReducer.midfielders,
  forwards: state.fantasyClubReducer.forwards,
  starters: state.fantasyClubReducer.starters,
  benchwarmers: state.fantasyClubReducer.benchwarmers
});

const RosterDisplay = connect(
  mapDisplayStateToProps
)(Display);

export default CSSModules(RosterDisplay, styles);