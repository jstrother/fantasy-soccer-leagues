// components/fantasyMatch.js

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../scss/fantasyMatch.scss';

export class FantasyMatch extends React.Component {
	render() {
		return(
			<div
				className={styles.fantasyMatch}>
				{/*{`Home: ${this.props.homeClub.clubName}`}*/}
				{/*{`Away: ${this.props.awayClub.clubName}`}*/}
			</div>
		);
	}
}

export default CSSModules(FantasyMatch, styles);