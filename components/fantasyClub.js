/* eslint-disable no-unused-vars*/
// components/fantasyClub.js
// imported into home.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasySchedule from './fantasySchedule.js';
import Roster from './roster.js';
import styles from '../scss/fantasyClub.scss';

export class FantasyTeam extends React.Component {
	submitClubName(event) {
		
	}
	
	render() {
		if (!this.props.clubName) {
			return(
				<div
					className={styles.fantasyClub}>
					<form>
						<input
							className={'clubNameInput'}
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
		
		if(this.props.fantasyClub.name) {
			return(
				<div
					className={styles.fantasyClub}>
					<h3>{this.props.fantasyClub.name}</h3>
					<div
						className={styles.rosterDiv}>
						Select players for your roster.
						<Roster />
					</div>
					<div>
						Set your lineup for upcoming matches.
						<FantasySchedule /> {/* covers league matches within a division and the cup matches between all teams in all divisions */}
					</div>
				</div>
			);
		}
	}
}

const mapFantasyClubStateToProps = state => ({
	clubName: state.fantasyClubReducer.name
});

const FantasyClub = connect(
	mapFantasyClubStateToProps	
)(FantasyTeam);

export default CSSModules(FantasyClub, styles);