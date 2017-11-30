// components/player.js
// this shows all data associated with a given player

import React from 'react';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';

export default class Player extends React.Component {
	render() {
		let leagueName;
		
		LEAGUE_IDS_NAMES.forEach(league => {
			if (this.props.leagueId === league.id) {
				leagueName = league.name;
			}
		});
		
		return(
			<div>
				<h2 className={'player-name'}>{`${this.props.firstName} ${this.props.lastName}`}</h2>
				<h3 className={'player-position'}>{this.props.position}</h3>
				<h3 className={'player-club'}>{this.props.club}</h3>
				<h3 className={'player-league'}>{leagueName}</h3>
				<div className={'player-stats'}>
					<h3 className={'stats-header'}>Stats:</h3>
					
					<h4 className={'shots-header'}>Shots:</h4>
					<p className={'shots-total'}>Total: {this.props.shotsTotal}</p>
					<p className={'shots-on-goal'}>On Goal: {this.props.shotsOnGoal}</p>
					
					<h4 className={'goals-header'}>Goals:</h4>
					<p className={'goals-scored'}>Scored: {this.props.goalsScored}</p>
					<p className={'goals-conceded'}>Conceded: {this.props.goalsConceded}</p>
					<p className={'own-goals'}>Own Goals: {this.props.ownGoals}</p>
					
					<h4 className={'fouls-header'}>Fouls:</h4>
					<p className={'fouls-drawn'}>Drawn: {this.props.foulsDrawn}</p>
					<p className={'fouls-committed'}>Committed: {this.props.foulsCommitted}</p>
					
					<h4 className={'cards-header'}>Cards:</h4>
					<p className={'yellow-cards'}>Yellow Cards: {this.props.yellowCards}</p>
					<p className={'red-cards'}>Red Cards: {this.props.redCards}</p>
					
					<h4 className={'passing-header'}>Passing:</h4>
					<p className={'total-crosses'}>Total Crosses: {this.props.totalCrosses}</p>
					<p className={'crossing-accuracy'}>Crossing Accuracy: {this.props.crossingAccuracy}</p>
					<p className={'total-passes'}>Total Passes: {this.props.totalPasses}</p>
					<p className={'passing-accuracy'}>Passing Accuracy: {this.props.passingAccuracy}</p>
					
					<h4 className={'penalties-header'}>Penalties:</h4>
					<p className={'penalties-scored'}>Scored: {this.props.penaltiesScored}</p>
					<p className={'penalties-missed'}>Missed: {this.props.penaltiesMissed}</p>
					<p className={'penalties-saved'}>Saved: {this.props.penaltiesSaved}</p>
					
					<h4 className={'additional-stats-header'}>Additional Stats:</h4>
					<p className={'assists'}>Assists: {this.props.assists}</p>
					<p className={'offsides'}>Offsides: {this.props.offsides}</p>
					<p className={'saves'}>Saves: {this.props.saves}</p>
					<p className={'tackles'}>Tackles: {this.props.tackles}</p>
					<p className={'blocks'}>Blocks: {this.props.blocks}</p>
					<p className={'interceptions'}>Interceptions: {this.props.interceptions}</p>
					<p className={'clearances'}>Clearances: {this.props.clearances}</p>
					<p className={'minutes-played'}>Minutes Played: {this.props.minutesPlayed}</p>
				</div>
				<div className={'player-points'}>
					<h3 className={'points-header'}>Fantasy Points:</h3>
					<p className={'fixture-points'}>Most Recent Match: {this.props.fixturePoints}</p>
					<p className={'season-points'}>Season Total: {this.props.seasonPoints}</p>
				</div>
			</div>
		);
	}
}