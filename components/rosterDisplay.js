/*eslint-disable no-console, no-unused-vars*/
// components/rosterDisplay.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { getClub, removeGoalkeeper, removeDefender, removeMidfielder, removeForward, addStarter, addBench } from '../flow/subActions/fantasyClubActions.js';
import { warning } from '../flow/subActions/warningActions.js';
import { fetchPlayerData } from '../flow/subActions/playerActions.js';
import styles from '../scss/rosterDisplay.scss';

export class Display extends React.Component {
	componentDidMount() {
		this.props.dispatch(getClub(this.props.accessToken));
	}
	
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
			this.props.dispatch(removeGoalkeeper(this.props.accessToken, player));
		}
		if (player.position === 'D' || player.position === 'Defender') {
			this.props.dispatch(removeDefender(this.props.accessToken, player));
		}
		if (player.position === 'M' || player.position === 'Midfielder') {
			this.props.dispatch(removeMidfielder(this.props.accessToken, player));
		}
		if (player.position === 'F' || player.position === 'Attacker') {
			this.props.dispatch(removeForward(this.props.accessToken, player));
		}
  }
  
	addStarter(event) {
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
		
		if (this.props.starters.length < 11) {
			if (this.props.benchwarmers.length > 0) {
				this.props.benchwarmers.forEach(p => {
					if (player.idFromAPI !== p.idFromAPI) {
						this.props.dispatch(addStarter(this.props.accessToken, player));
					}
				});
			} else {
				this.props.dispatch(addStarter(this.props.accessToken, player));
			}
		} else {
			this.props.dispatch(warning('You already have 11 starters.'));
		}
	}
	
	addBench(event) {
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
		
		if (this.props.benchwarmers.length < 7 ) {
			// checking whether player is already a starter, can't have a player be a starter and on bench at same time
			this.props.starters.forEach(starter => {
				console.log('selected player:', player.idFromAPI);
				console.log('starter:', starter.idFromAPI);
				if (player.idFromAPI === starter.idFromAPI) {
					console.log('idFromAPI matches');
				} else {
					console.log('idFromAPI does not match');
				}
				// if (player.idFromAPI !== starter.idFromAPI) {
				// 	this.props.dispatch(addBench(this.props.accessToken, player));
				// } else {
				// 	this.props.dispatch(warning('This player is already in your starting eleven.'));
				// }
			});
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
    return(
      <div
				className={styles.rosterDisplay}>
				Roster:
				<h5>Click on a player's name to view their stats.</h5>
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
							<th>
								Make Starter?
							</th>
							<th>
								Have on Bench?
							</th>
							<th>
								Remove from Roster
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
											className={styles.pointer}
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
											className={styles.pointer}
											data-id={p.idFromAPI}
											data-firstname={p.firstName}
											data-lastname={p.lastName}
											data-position={p.position}
											onClick={this.addStarter.bind(this)}>
											Make Starter
										</td>
										<td
											className={styles.pointer}
											data-id={p.idFromAPI}
											data-firstname={p.firstName}
											data-lastname={p.lastName}
											data-position={p.position}
											onClick={this.addBench.bind(this)}>
											Have on Bench
										</td>
										<td
											className={styles.pointer}
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
    );
  }
}

const mapDisplayStateToProps = state => ({
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