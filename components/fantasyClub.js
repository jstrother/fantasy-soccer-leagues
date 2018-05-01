/* eslint-disable no-console, no-unused-vars*/
// components/fantasyClub.js
// imported into home.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasySchedule from './fantasySchedule.js';
import Roster from './roster.js';
import FantasyLeague from './fantasyLeague.js';
import { getClub, newClub } from '../flow/subActions/fantasyClubActions.js';
import { clubOwner } from '../flow/subActions/userActions.js';
import styles from '../scss/fantasyClub.scss';

export class FantasyTeam extends React.Component {
	componentDidMount() {
		if (this.props.hasClub === true) {
			this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
		}
  }
  
	handleKeyPress(event) {
		// makes sure that the same thing happens as submitClubName(), but for pressing Enter key instead
		if (event.key === 'Enter') {
			event.preventDefault();
			this.props.dispatch(newClub(this.props.accessToken, this.clubNameInput.value, this.props.userId));
			this.props.dispatch(clubOwner(this.props.accessToken, true));
			this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
		}
	}
  
	submitClubName(event) {
		event.preventDefault();
		this.props.dispatch(newClub(this.props.accessToken, this.clubNameInput.value, this.props.userId));
		this.props.dispatch(clubOwner(this.props.accessToken, true));
		this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
	}
	
	render() {
		if (this.props.hasClub === false) {
			return(
				<div
					className={styles.fantasyClub}>
					<form
						className={'clubNameForm'}>
						<input
							className={'clubNameInput'}
							onKeyPress={this.handleKeyPress.bind(this)}
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
		
		if(this.props.hasClub === true) {
			return(
				<div
					className={this.props.playerDataShow === false ? styles.fantasyClub : styles.hidden}>
					<div
						className={styles.rosterDiv}>
						<Roster />
					</div>
					<div>
						<FantasySchedule />
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
	userId: state.userReducer.userId,
	accessToken: state.userReducer.accessToken,
	hasClub: state.userReducer.hasClub,
	playerDataShow: state.playerReducer.show,
	clubName: state.fantasyClubReducer.clubName,
	manager: state.fantasyClubReducer.manager
});

const FantasyClub = connect(
	mapFantasyClubStateToProps	
)(FantasyTeam);

export default CSSModules(FantasyClub, styles);