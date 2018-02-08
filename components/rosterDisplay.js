/*eslint-disable no-console, no-unused-vars*/
// components/rosterDisplay.js
// imported into roster.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import styles from '../scss/rosterDisplay.scss';

export class Display extends React.Component {
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
    );
  }
}

const mapDisplayStateToProps = state => ({
  accessToken: state.userReducer.accessToken,
  roster: state.fantasyClubReducer.roster,
  player: state.playerReducer.player
});

const RosterDisplay = connect(
  mapDisplayStateToProps
)(Display);

export default CSSModules(RosterDisplay, styles);