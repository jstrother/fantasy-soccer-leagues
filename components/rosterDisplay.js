/*eslint-disable no-console, no-unused-vars*/
// components/rosterDisplay.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { getClub, removeGoalkeeper } from '../flow/subActions/fantasyClubActions.js';
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
			console.log('player removed!');
			// this.props.dispatch(removeDefender(this.props.accessToken, player));
		}
		if (player.position === 'M' || player.position === 'Midfielder') {
			console.log('player removed!');
			// this.props.dispatch(removeMidfielder(this.props.accessToken, player));
		}
		if (player.position === 'F' || player.position === 'Attacker') {
			console.log('player removed!');
			// this.props.dispatch(removeForward(this.props.accessToken, player));
		}
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
										<td
											className={styles.playerName}>
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
											className={styles.playerRemove}
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