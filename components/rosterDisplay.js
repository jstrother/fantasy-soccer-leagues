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
							this.props.roster
							.forEach(id => {
								console.log('id:', id);
								// this.rosterPlayers(id);
								this.props.fetchRosterPlayerData(id)
								.then(p => {
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
								});
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
  roster: state.fantasyClubReducer.roster,
  player: state.playerReducer.player
});

const mapDisplayDispatchToProps = dispatch => {
	return {
		fetchRosterPlayerData: id => {
			dispatch(fetchRosterPlayerData(this.props.accessToken, id));
		}
	};
};

const RosterDisplay = connect(
  mapDisplayStateToProps,
  mapDisplayDispatchToProps
)(Display);

export default CSSModules(RosterDisplay, styles);