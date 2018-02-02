/* eslint-disable no-console, no-unused-vars*/
// components/fantasyClub.js
// imported into home.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasySchedule from './fantasySchedule.js';
import Roster from './roster.js';
import FantasyLeague from './fantasyLeague.js';
import { addClubName, addManager, getClub } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/fantasyClub.scss';

export class FantasyTeam extends React.Component {
	componentDidMount() {
    this.props.dispatch(addManager(this.props.accessToken, this.props.displayName));
    this.props.dispatch(getClub(this.props.accessToken));
  }
	submitClubName(event) {
		event.preventDefault();
		this.props.dispatch(addClubName(this.props.accessToken, this.clubNameInput.value));
	}
	
	render() {
		if (!this.props.clubName) {
			return(
				<div
					className={styles.fantasyClub}>
					<form
						className={'clubNameForm'}>
						<input
							className={'clubNameInput'}
							ref={(input) => {this.clubNameInput = input;}}
							type="text"
							placeholder="Enter your club's name"/>
						<button
							className={'clubNameSubmit'}
							type="button"
							onClick={this.submitClubName.bind(this)}>
							Submit
						</button>
					</form>
				</div>
			);
		}
		
		if(this.props.clubName) {
			return(
				<div
					className={styles.fantasyClub}>
					<h3>{this.props.clubName}</h3>
					<div
						className={styles.rosterDiv}>
						Select players for your roster.
						<Roster />
					</div>
					<div>
						Set your lineup for upcoming matches.
						<FantasySchedule /> {/* covers league matches within a division and the cup matches between all teams in all divisions */}
					</div>
					<div
            className={styles.league}>
            <FantasyLeague />
          </div>
				</div>
			);
		}
	}
}

const mapFantasyClubStateToProps = state => ({
	accessToken: state.userReducer.accessToken,
	displayName: state.userReducer.displayName,
	clubName: state.fantasyClubReducer.clubName,
	manager: state.fantasyClubReducer.manager
});

const FantasyClub = connect(
	mapFantasyClubStateToProps	
)(FantasyTeam);

export default CSSModules(FantasyClub, styles);