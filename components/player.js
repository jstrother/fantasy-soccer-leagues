// components/player.js
// imported into roster.js

import React from 'react';

export default class Player extends React.Component {
	render() {
		return(
			<div>
				<h2 className={'player-name'}>{this.props.name}</h2>
				<h4 className={'player-position'}>{this.props.position}</h4>
				<h4 className={'player-club'}>{this.props.club}</h4>
				<h4 className={'player-league'}>{this.props.league}</h4>
				<p className={'player-points'}>Total Fantasy Points: {this.props.fantasyPoints}</p>
			</div>
		);
	}
}