// components/fantasyMatch.js

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../scss/fantasyMatch.scss';
import {localeDate} from '../server/programFunctions/localeDate_function.js';

export class FantasyMatch extends React.Component {
	render() {
		const matchDay = localeDate(this.props.matchDate);
		return(
			<div
				className={styles.fantasyMatch}>
				<p
					className={styles.homeClub}>{`Home: ${this.props.homeClub}`}</p>
				<p
					className={this.props.homeScore !== null ? styles.homeScore : styles.hidden}>{`Score: ${this.props.homeScore}`}</p>
				<p
					className={styles.awayClub}>{`Away: ${this.props.awayClub}`}</p>
				<p
					className={this.props.awayScore !== null ? styles.awayScore : styles.hidden}>{`Score: ${this.props.awayScore}`}</p>
				<p
					className={styles.matchDate}>{matchDay}</p>
			</div>
		);
	}
}

export default CSSModules(FantasyMatch, styles);