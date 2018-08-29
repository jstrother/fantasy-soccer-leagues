/*eslint-disable no-unused-vars, no-console*/
// components/startingEleven.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { removeStarter } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/startingEleven.scss';

export class Starters extends React.Component {
  handleMatchdayRemove(event) {
    let dataSet = event.target.dataset,
      player = {
        idFromAPI: parseInt(dataSet.id, 10),
        firstName: dataSet.firstname,
        lastName: dataSet.lastname,
        position: dataSet.position
      };
    
    this.props.dispatch(removeStarter(this.props.accessToken, this.props.userId, player));
  }
  render () {
    let starters = this.props.starters === undefined ? 0 : this.props.starters.length;
    if (starters > 0) {
      return(
        <div
          className={styles.startingEleven}>
          <table
            className={styles.startersTable}>
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
                this.props.starters
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
					You have no starting players yet.
				</div>
			);
    }
  }
}

const mapStartersStateToProps = state => ({
  userId: state.userReducer.userId,
  accessToken: state.userReducer.accessToken,
  starters: state.fantasyClubReducer.starters
});

const StartingEleven = connect(
  mapStartersStateToProps
)(Starters);

export default CSSModules(StartingEleven, styles);