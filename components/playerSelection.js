/*eslint-disable no-console, no-unused-vars*/
// components/playerSelection.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import { fetchLeague, playerPositionSelect, playerClubSelect } from '../flow/subActions/leagueActions.js';
import { addRoster } from '../flow/subActions/fantasyClubActions.js';
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
		let playerId = parseInt(event.target.id.slice(4), 10);
		console.log('event.target playerSelection.js:', event.target);
		console.log('playerId playerSelection.js:', playerId);
		this.props.dispatch(addRoster(this.props.accessToken, playerId));
	}
  
  render() {
    if (this.props.playerList) {
      const league = LEAGUE_IDS_NAMES.find(l => l.id === this.props.fantasyLeagueId);
      return(
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
											id={`sel-${p.idFromAPI}`}
											key={p.idFromAPI}
											onClick={this.handleRosterAdd.bind(this)}>
											<td
												id={`api-${p.idFromAPI}`}>
												{`${p.firstName} ${p.lastName}`}
											</td>
											<td
												id={`pos-${p.idFromAPI}`}>
												{p.position}
											</td>
											<td
												id={`nam-${p.idFromAPI}`}>
												{p.clubName}
											</td>
											<td
												id={`pts-${p.idFromAPI}`}>
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
  clubSelection: state.leagueReducer.club
});

const PlayerSelction = connect(
  mapSelectionStateToProps
)(Selection);

export default CSSModules(PlayerSelction, styles);