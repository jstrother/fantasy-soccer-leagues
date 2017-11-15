

import React from 'react';
import { connect } from 'react-redux';

import Player from './player.js';

export class StarterList extends React.Component {
	// dispatch selectStarters action here
	
	render() {
		console.log(this.props.players);
		return(
			<div>
				{ this.props.players.map(player => 
					<Player name={player.id}
						position={player.position}
						club={player.clubName}
						shotsTotal={player.stats.shots.shotsTotal}
						shotsOnGoal={player.stats.shots.shotsOnGoal}
						goalsScored={player.stats.goals.scored}
						goalsConceded={player.stats.goals.conceded}
						ownGoals={player.stats.goals.ownGoals}
						foulsDrawn={player.stats.fouls.drawn}
						foulsCommitted={player.stats.fouls.committed}
						yellowCards={player.stats.cards.yellowCards}
						redCards={player.stats.cards.redCards}
						totalCrosses={player.stats.passing.totalCrosses}
						crossesAccuracy={player.stats.passing.crossesAccuracy}
						totalPasses={player.stats.passing.passes}
						passingAccuracy={player.stats.passing.passingAccuracy}
						assists={player.stats.other.assists}
						offsides={player.stats.other.offsides}
						saves={player.stats.other.saves}
						penaltiesScored={player.stats.other.penaltiesScored}
						penaltiesMissed={player.stats.other.penaltiesMissed}
						penaltiesSaved={player.stats.other.penaltiesSaved}
						tackles={player.stats.other.tackles}
						blocks={player.stats.other.blocks}
						interceptions={player.stats.other.interceptions}
						clearances={player.stats.other.clearances}
						minutesPlayed={player.stats.other.minutesPlayed} />
					) 
				}
			</div>
		);
	}
}

const mapStartersStateToProps = state => ({
	players: state.updateRosterReducer.players
});

const Starters = connect(
	mapStartersStateToProps
)(StarterList);

export default Starters;