// components/startingEleven.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { removeGoalkeeper } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/benchPlayers.scss';

export class Bench extends React.Component {
  handleMatchdayRemove(event) {
    let dataSet = event.target.dataset,
      player = {
        idFromAPI: parseInt(dataSet.id, 10),
        firstName: dataSet.firstname,
        lastName: dataSet.lastname,
        position: dataSet.position
      };
    
    this.props.dispatch(removeGoalkeeper(this.props.accessToken, player));
  }
  render () {
    if (this.props.benchwarmers) {
			return(
				<div>
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
									Remove from Starting 11?
								</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.benchwarmers
								.map(p => {
									return(
										<tr
											id={`s11-${p.idFromAPI}`}
											key={`key-${p.idFromAPI}`}>
											<td>
												{`${p.firstName} ${p.lastName}`}
											</td>
											<td>
												{`${p.position}`}
											</td>
											<td
												className={styles.pointer}
												data-id={p.idFromAPI}
												data-firstname={p.firstName}
												data-lastname={p.lastName}
												data-position={p.position}
												onClick={this.handleMatchdayRemove.bind(this)}>
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
    else {
			return(
				<div>
					You have no bench players yet.
				</div>
			);
    }
  }
}

const mapBenchStateToProps = state => ({
	accessToken: state.userReducer.accessToken,
  benchwarmers: state.fantasyClubReducer.benchwarmers
});

const BenchPlayers = connect(
  mapBenchStateToProps
)(Bench);

export default CSSModules(BenchPlayers, styles);