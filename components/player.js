/* eslint-disable no-console, no-unused-vars*/
// components/player.js
// this shows all data associated with a given player

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { playerHideSuccess } from '../flow/subActions/playerActions.js';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import styles from '../scss/player.scss';

export class Teammate extends React.Component {
	playerDataClose() {
		this.props.dispatch(playerHideSuccess());
	}
	
	render() {
		if (this.props.player) {
			return(
				<div
					className={this.props.show === false ? styles.hidden : styles.player}>
					<div
						className={styles.playerHeader}>
						<figure>
							<img className={styles.playerPicture} src={this.props.player.picture} alt={`${this.props.player.fullName} Picture`} />
							<figcaption
								className={styles.playerName}>
								{`${this.props.player.firstName} ${this.props.player.lastName}`}
								<br />
								{this.props.player.position}
							</figcaption>
						</figure>
						<div className={styles.PointsDiv}>
							<h3 className={styles.pointsHeader}>Fantasy Points:</h3>
							<p className={styles.fixturePoints}>Most Recent Match: {this.props.player.fantasyPoints.fixture}</p>
							<p className={styles.seasonPoints}>Season Total: {this.props.player.fantasyPoints.season}</p>
						</div>
						<figure>
							<img className={styles.clubLogo} src={this.props.player.clubLogo} alt={`${this.props.player.clubName}`} />
							<figcaption
								className={styles.clubName}>
								{this.props.player.clubName}
							</figcaption>
						</figure>
					</div>
					<div className={styles.playerStats}>
						<h3 className={styles.statsHeader}>Stats:</h3>
						
						<div
							className={styles.shotsDiv}>
							<h4 className={styles.shotsHeader}>Shots:</h4>
							<p className={styles.shotsTotal}>Total: {this.props.player.stats.shots.shotsTotal}</p>
							<p className={styles.shotsOnGoal}>On Goal: {this.props.player.stats.shots.shotsOnGoal}</p>
						</div>
						
						<div
							className={styles.goalsDiv}>
							<h4 className={styles.goalsHeader}>Goals:</h4>
							<p className={styles.goalsScored}>Scored: {this.props.player.stats.goals.scored}</p>
							<p className={styles.goalsConceded}>Conceded: {this.props.player.stats.goals.conceded}</p>
							<p className={styles.ownGoals}>Own Goals: {this.props.player.stats.goals.ownGoals}</p>
						</div>
						
						<div
							className={styles.foulsDiv}>
							<h4 className={styles.foulsHeader}>Fouls:</h4>
							<p className={styles.foulsDrawn}>Drawn: {this.props.player.stats.fouls.drawn}</p>
							<p className={styles.foulsCommitted}>Committed: {this.props.player.stats.fouls.committed}</p>
						</div>
						
						<div
							className={styles.cardsDiv}>
							<h4 className={styles.cardsHeader}>Cards:</h4>
							<p className={styles.yellowCards}>Yellow Cards: {this.props.player.stats.cards.yellowCards}</p>
							<p className={styles.redCards}>Red Cards: {this.props.player.stats.cards.redCards}</p>
						</div>
						
						<div
							className={styles.passingDiv}>
							<h4 className={styles.passingHeader}>Passing:</h4>
							<p className={styles.totalCrosses}>Total Crosses: {this.props.player.stats.passing.totalCrosses}</p>
							<p className={styles.crossesAccuracy}>Crossing Accuracy: {this.props.player.stats.passing.crossesAccuracy}</p>
							<p className={styles.totalPasses}>Total Passes: {this.props.player.stats.passing.passes}</p>
							<p className={styles.passingAccuracy}>Passing Accuracy: {this.props.player.stats.passing.passingAccuracy}</p>
						</div>
						
						<div
							className={styles.penaltiesDiv}>
							<h4 className={styles.penaltiesHeader}>Penalties:</h4>
							<p className={styles.penaltiesScored}>Scored: {this.props.player.stats.other.penaltiesScored}</p>
							<p className={styles.penaltiesMissed}>Missed: {this.props.player.stats.other.penaltiesMissed}</p>
							<p className={styles.penaltiesSaved}>Saved: {this.props.player.stats.other.penaltiesSaved}</p>
						</div>
						
						<div
							className={styles.additionalStatsDiv}>
							<h4 className={styles.additionalStatsHeader}>Additional Stats:</h4>
							<p className={styles.assists}>Assists: {this.props.player.stats.other.assists}</p>
							<p className={styles.offsides}>Offsides: {this.props.player.stats.other.offsides}</p>
							<p className={styles.saves}>Saves: {this.props.player.stats.other.saves}</p>
							<p className={styles.tackles}>Tackles: {this.props.player.stats.other.tackles}</p>
							<p className={styles.blocks}>Blocks: {this.props.player.stats.other.blocks}</p>
							<p className={styles.interceptions}>Interceptions: {this.props.player.stats.other.interceptions}</p>
							<p className={styles.clearances}>Clearances: {this.props.player.stats.other.clearances}</p>
							<p className={styles.minutesPlayed}>Minutes Played: {this.props.player.stats.other.minutesPlayed}</p>
						</div>
					</div>
					<div
						className={styles.playerDataClose}>
						<button
							type='button'
							onClick={this.playerDataClose.bind(this)}>
							Close
						</button>
					</div>
				</div>
			);
		}
		else {
			return (
				<div
					className={styles.hidden}>
				</div>
			);
		}
	}
}

const mapPlayerStateToProps = state => (
	{
		player: state.playerReducer.player,
		show: state.playerReducer.show
	}
);

const Player = connect(
	mapPlayerStateToProps	
)(Teammate);

export default CSSModules(Player, styles);