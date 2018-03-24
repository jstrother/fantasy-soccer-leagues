// components/fantasyMatch.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { matchResolution } from '../flow/subActions/fantasyScheduleActions.js';
import styles from '../scss/fantasyMatch.scss';

export class FantasyGame extends React.Component {
	componentDidMount() {
		this.props.dispatch(matchResolution());
	}
	render() {
		return(
			<div
				className={styles.fantasyMatch}>
				Fantasy Match
			</div>
		);
	}
}

const mapMatchesStateToProps = state => ({
	homeClub: state.fantasyMatchReducer.homeClub,
	homeScore: state.fantasyMatchReducer.homeScore,
	awayClub: state.fantasyMatchReducer.awayClub,
	awayScore: state.fantasyMatchReducer.awayScore
});

const FantasyMatch = connect(
	mapMatchesStateToProps
)(FantasyGame);

export default CSSModules(FantasyMatch, styles);