// components/fantasyMatch.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { matchResolve } from '../flow/subActions/fantasyScheduleActions.js';
import styles from '../scss/fantasyMatch.scss';

export class FantasyGame extends React.Component {
	componentDidMount() {
		if (this.props.fantasySchedule !== null) {
			this.props.dispatch(matchResolve());
		}
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
	fantasySchedule: state.fantasyScheduleReducer.fantasySchedule
});

const FantasyMatch = connect(
	mapMatchesStateToProps
)(FantasyGame);

export default CSSModules(FantasyMatch, styles);