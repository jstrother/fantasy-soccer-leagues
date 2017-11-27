// components/player.js
// imported into roster.js

import React from 'react';

export default class Player extends React.Component {
	render() {
		return(
			<div>
				<h2 className={'player-name'}>{`${this.props.firstName} ${this.props.lastName}`}</h2>
				<h3 className={'player-position'}>{this.props.position}</h3>
				<h3 className={'player-club'}>{this.props.club}</h3>
				<h3 className={'player-league'}>{this.props.league}</h3>
				<div className={'player-stats'}>
					<h3>Stats:</h3>
					
					<h4 className={'shots'}>Shots:</h4>
					<p>Total: {this.props.shotsTotal}</p>
					<p>On Goal: {this.props.shotsOnGoal}</p>
					
					<h4 className={'goals'}>Goals:</h4>
					<p>Scored: {this.props.goalsScored}</p>
					<p>Conceded: {this.props.goalsConceded}</p>
					<p>Own Goals: {this.props.ownGoals}</p>
					
					<h4 className={'fouls'}>Fouls:</h4>
					<p>Drawn: {this.props.foulsDrawn}</p>
					<p>Committed: {this.props.foulsCommitted}</p>
					
					<h4 className={'cards'}>Cards:</h4>
					<p>Yellow Cards: {this.props.yellowCards}</p>
					<p>Red Cards: {this.props.redCards}</p>
					
					<h4 className={'penalties'}>Penalties:</h4>
				</div>
				<div className={'player-points'}>
					<h3>Fantasy Points:</h3>
					<p>Most Recent Match: {this.props.fixturePoints}</p>
					<p>Season Total: {this.props.seasonPoints}</p>
				</div>
			</div>
		);
	}
}