// components/player.js
// imported into roster.js

import React from 'react';

export class Player2 extends React.Component {
	render() {
		console.log('props:', this.props);
		return(
			<div>
				{console.log('div props:', this.props)}
				<div>Name: {'Hello, World'}</div>
				<div>Position:</div>
				<div>Club:</div>
				<div>League:</div>
				<div>Division:</div>
				<div>Stats:</div>
				<div>Starting 11 (Y/N):</div>
				<div>18-Player MatchDay Roster (Y/N):</div>
				<div>22-Player First Team Roster (Y/N):</div>
				<div>Total Fantasy Points:</div>
			</div>
		);
	}
}

export default function Player(props) {
	return (
		<div>
			<div>Name: Hello {props.name}</div>
		</div>
	);
}