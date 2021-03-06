/* eslint-disable no-console, no-unused-vars*/
// components/fantasyClub.js
// imported into home.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasySchedule from './fantasySchedule.js';
import Roster from './roster.js';
import FantasyStandings from './fantasyStandings.js';
import { getClub, newClub } from '../flow/subActions/fantasyClubActions.js';
import { clubOwner } from '../flow/subActions/userActions.js';
import styles from '../scss/fantasyClub.scss';

export class FantasyTeam extends React.Component {
	componentDidMount() {
		if (this.props.hasClub) {
			this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
		}
	}

	handleKeyPress(event) {
		// makes sure that the clubName gets saved, but when pressing Enter key
		if (event.key === 'Enter') {
			this.setClubName(event);
		}
	}

	submitClubName(event) {
		// makes sure that the clubName gets saved, but when clicking submit button
		this.setClubName(event);
	}

	setClubName(event) {
		event.preventDefault();
		this.props.dispatch(newClub(this.props.accessToken, this.clubNameInput.value, this.props.userId));
		this.props.dispatch(clubOwner(this.props.userId, this.props.accessToken, true));
		this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
	}

	render() {
		if (!this.props.hasClub) {
			return (
				<div className={styles.fantasyClub}>
					<form className={'clubNameForm'}>
						<input
							className={'clubNameInput'}
							onKeyPress={this.handleKeyPress.bind(this)}
							ref={input => {
								this.clubNameInput = input;
							}}
							type="text"
							placeholder="Enter your club's name"
						/>
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

		if (this.props.hasClub === true) {
			return (
				<div
					className={
						this.props.playerDataShow === false
							? styles.fantasyClub
							: styles.hidden
					}>
					<Roster />
					<FantasySchedule />
					<FantasyStandings />
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

const FantasyClub = connect(mapFantasyClubStateToProps)(FantasyTeam);

export default CSSModules(FantasyClub, styles);
