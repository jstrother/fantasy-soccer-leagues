// components/player.js
// imported into roster.js

import React from 'react';

export default class Player extends React.Component {
	render() {
		return(
			<div>
				<div >Name:</div>
				<div >Position:</div>
				<div >Club:</div>
				<div >League:</div>
				<div >Division:</div>
				<div >Stats:</div>
				<div >Starting 11 (Y/N):</div>
				<div >18-Player MatchDay Roster (Y/N):</div>
				<div >22-Player First Team Roster (Y/N):</div>
				<div >Total Fantasy Points:</div>
			</div>
		);
	}
}