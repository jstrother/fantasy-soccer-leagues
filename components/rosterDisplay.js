/*eslint-disable no-console, no-unused-vars*/
// components/rosterDisplay.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { getClub } from '../flow/subActions/fantasyClubActions.js';
import { fetchRosterPlayerData } from '../flow/subActions/playerActions.js';
import styles from '../scss/rosterDisplay.scss';

export class Display extends React.Component {
	componentDidMount() {
		this.props.dispatch(getClub(this.props.accessToken));
	}
	
	rosterPlayers(playerId) {
		let player = this.props.dispatch(fetchRosterPlayerData(this.props.accessToken, playerId));
		console.log('player:', player);
	}
	
  handleRosterRemove(event) {
    
  }
  
  render() {
		let roster = [];
		roster.push.apply(roster, this.props.goalkeepers);
		roster.push.apply(roster, this.props.defenders);
		roster.push.apply(roster, this.props.midfielders);
		roster.push.apply(roster, this.props.forwards);
		console.log('roster > rosterDisplay.js:', roster);
		console.log('defenders > rosterDisplay.js:', this.props.defenders);
    return(
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
										<td>
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
  player: state.playerReducer.player
});

const RosterDisplay = connect(
  mapDisplayStateToProps
)(Display);

export default CSSModules(RosterDisplay, styles);