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
				<div >Total Fantasy Points:</div>
			</div>
		);
	}
}