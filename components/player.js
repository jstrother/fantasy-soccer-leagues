// components/player.js
// this shows all data associated with a given player

import React from 'react';
import { connect } from 'react-redux';
import { fetchStarter, fetchBenchwarmer, fetchReserve } from '../flow/subActions/playerActions.js';

import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';

export class Teammate extends React.Component {
	handleStarterClick(player) {
		this.props.dispatch(fetchStarter(player));
	}
	
	handleMatchdayClick(player){
		this.props.dispatch(fetchBenchwarmer(player));
	}
	
	handleReserveClick(player) {
		this.props.dispatch(fetchReserve(player));
	}
	
	render() {
		let leagueName;
		
		LEAGUE_IDS_NAMES.forEach(league => {
			if (this.props.leagueId === league.id) {
				leagueName = league.name;
			}
		});
		
		return(
			<div>
				<h2 className='player-name'>{`${this.props.firstName} ${this.props.lastName}`}</h2>
				<img className='player-picture' src={this.props.picture} alt={this.props.fullName} />
				<h3 className='player-position'>{this.props.position}</h3>
				<h3 className='player-club'>{this.props.club}</h3>
				<h3 className='player-league'>{leagueName}</h3>
				<div className='player-stats'>
					<h3 className='stats-header'>Stats:</h3>
					
					<h4 className='shots-header'>Shots:</h4>
					<p className='shots-total'>Total: {this.props.shotsTotal}</p>
					<p className='shots-on-goal'>On Goal: {this.props.shotsOnGoal}</p>
					
					<h4 className='goals-header'>Goals:</h4>
					<p className='goals-scored'>Scored: {this.props.goalsScored}</p>
					<p className='goals-conceded'>Conceded: {this.props.goalsConceded}</p>
					<p className='own-goals'>Own Goals: {this.props.ownGoals}</p>
					
					<h4 className='fouls-header'>Fouls:</h4>
					<p className='fouls-drawn'>Drawn: {this.props.foulsDrawn}</p>
					<p className='fouls-committed'>Committed: {this.props.foulsCommitted}</p>
					
					<h4 className='cards-header'>Cards:</h4>
					<p className='yellow-cards'>Yellow Cards: {this.props.yellowCards}</p>
					<p className='red-cards'>Red Cards: {this.props.redCards}</p>
					
					<h4 className='passing-header'>Passing:</h4>
					<p className='total-crosses'>Total Crosses: {this.props.totalCrosses}</p>
					<p className='crossing-accuracy'>Crossing Accuracy: {this.props.crossingAccuracy}</p>
					<p className='total-passes'>Total Passes: {this.props.totalPasses}</p>
					<p className='passing-accuracy'>Passing Accuracy: {this.props.passingAccuracy}</p>
					
					<h4 className='penalties-header'>Penalties:</h4>
					<p className='penalties-scored'>Scored: {this.props.penaltiesScored}</p>
					<p className='penalties-missed'>Missed: {this.props.penaltiesMissed}</p>
					<p className='penalties-saved'>Saved: {this.props.penaltiesSaved}</p>
					
					<h4 className='additional-stats-header'>Additional Stats:</h4>
					<p className='assists'>Assists: {this.props.assists}</p>
					<p className='offsides'>Offsides: {this.props.offsides}</p>
					<p className='saves'>Saves: {this.props.saves}</p>
					<p className='tackles'>Tackles: {this.props.tackles}</p>
					<p className='blocks'>Blocks: {this.props.blocks}</p>
					<p className='interceptions'>Interceptions: {this.props.interceptions}</p>
					<p className='clearances'>Clearances: {this.props.clearances}</p>
					<p className='minutes-played'>Minutes Played: {this.props.minutesPlayed}</p>
				</div>
				<div className='player-points'>
					<h3 className='points-header'>Fantasy Points:</h3>
					<p className='fixture-points'>Most Recent Match: {this.props.fixturePoints}</p>
					<p className='season-points'>Season Total: {this.props.seasonPoints}</p>
				</div>
				<div className='roster-selection-div'>
					<button
						className='add-starter-btn'
						onClick={this.handleStarterClick}>Add to Starting Lineup</button>
					<button
						className='add-matchday-btn'
						onClick={this.handleMatchdayClick}>Add to Matchday Roster</button>
					<button
						className='add-reserves-btn'
						onClick={this.handleReserveClick}>Add to Reserves</button>
				</div>
			</div>
		);
	}
}

const mapPlayerStateToProps = state => (
	{
		fullName: state.playerReducer.fullName,
		firstName: state.playerReducer.firstName,
		lastName: state.playerReducer.lastName,
		picture: state.playerReducer.picture,
		position: state.playerReducer.position,
		club: state.playerReducer.club,
		leagueId: state.playerReducer.leagueId,
		shotsTotal: state.playerReducer.stats.shots.shotsTotal,
		shotsOnGoal: state.playerReducer.stats.shots.shotsOnGoal,
		goalsScored: state.playerReducer.stats.goals.scored,
		goalsConceded: state.playerReducer.stats.goals.conceded,
		ownGoals: state.playerReducer.stats.goals.ownGoals,
		foulsDrawn: state.playerReducer.stats.fouls.drawn,
		foulsCommitted: state.playerReducer.stats.fouls.committed,
		yellowCards: state.playerReducer.stats.cards.yellowCards,
		redCards: state.playerReducer.stats.cards.redCards,
		totalCrosses: state.playerReducer.stats.passing.totalCrosses,
		crossingAccuracy: state.playerReducer.stats.passing.crossingAccuracy,
		totalPasses: state.playerReducer.stats.passing.totalPasses,
		passingAccuracy: state.playerReducer.stats.passing.passingAccuracy,
		penaltiesScored: state.playerReducer.stats.other.penaltiesScored,
		penaltiesMissed: state.playerReducer.stats.other.penaltiesMissed,
		penaltiesSaved: state.playerReducer.stats.other.penaltiesSaved,
		assists: state.playerReducer.stats.other.assists,
		offsides: state.playerReducer.stats.other.offsides,
		saves: state.playerReducer.stats.other.saves,
		tackles: state.playerReducer.stats.other.tackles,
		blocks: state.playerReducer.stats.other.blocks,
		interceptions: state.playerReducer.stats.other.interceptions,
		clearances: state.playerReducer.stats.other.clearances,
		minutesPlayed: state.playerReducer.stats.other.minutesPlayed,
		fixturePoints: state.playerReducer.fantasyPoints.fixture,
		seasonPoints: state.playerReducer.fantasyPoints.season
	}
);

export const Player = connect(
	mapPlayerStateToProps	
)(Teammate);