// components/fantasyMatch.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from '../scss/fantasyMatch.scss';

export class FantasyGame extends React.Component {
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
	state
});

const FantasyMatch = connect(
	mapMatchesStateToProps
)(FantasyGame);

export default CSSModules(FantasyMatch, styles);