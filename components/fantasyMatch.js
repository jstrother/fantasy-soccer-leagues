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
					className='homeClub'>{`Home: ${this.props.homeClub}`}</p>
				<p
					className={this.props.homeScore !== null ? 'homeScore' : styles.null}>{this.props.homeScore}</p>
				<p
					className='awayClub'>{`Away: ${this.props.awayClub}`}</p>
				<p
					className={this.props.awayScore !== null ? 'awayScore' : styles.null}>{this.props.awayScore}</p>
				<p
					className='matchDate'>{matchDay}</p>
			</div>
		);
	}
}

export default CSSModules(FantasyMatch, styles);