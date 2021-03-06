/*eslint-disable no-console, no-unused-vars*/
// components/benchPlayers.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { removeBench } from '../flow/subActions/fantasyClubActions.js';
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
    
    this.props.dispatch(removeBench(this.props.accessToken, this.props.userId, player));
  }
  render () {
		let benchwarmers = this.props.benchwarmers === undefined ? 0 : this.props.benchwarmers.length;
    if (benchwarmers > 0) {
			return(
				<div
					className={styles.benchPlayers}>
					<table
						className={styles.benchPlayerTable}>
						<thead>
							<tr>
								<th>
									Name
								</th>
								<th>
									Position
								</th>
								<th>
									Remove?
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
	userId: state.userReducer.userId,
	accessToken: state.userReducer.accessToken,
  benchwarmers: state.fantasyClubReducer.benchwarmers
});

const BenchPlayers = connect(
  mapBenchStateToProps
)(Bench);

export default CSSModules(BenchPlayers, styles);