// components/player.js
// imported into starter-list.js, bench-players.js, reserve-players.js

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
				<div >Champions League:</div> {/* this should only be visible if player's team plays at this level */}
				<div >Stats:</div>
				<div >Active This Week:</div>
				<div >Total Fantasy Points:</div>
			</div>
		);
	}
}