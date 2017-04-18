// the basic construction for all players

const Player = () => {
	this.playerName = null;
	this.playerClub = null;
	this.playerPosition = null;
	this.playerStats = {
		gamesPlayed: 0,
		gamesStarted: 0,
		minutesPlayed: 0,
		goals: 0,
		assists: 0,
		shotsTaken: 0,
		shotsOnGoal: 0,
		foulsCommitted: 0,
		timesOffside: 0,
		yellowCards: 0,
		redCards: 0
	};
	this.playerUniqueID = () => {
		// returns unique 7 digit ID the first time a particular player is created
		return Math.floor((Date.now() * (Math.random() * (Math.pow(10, 16))))) % Math.pow(10, 7);
	};
	this.playerValue = this.playerStats => {
		return null; // for now
	};
	this.playerSchedule = this.playerClub => {
		return null; // for now
	};
	this.playerURL = `http://www.mlssoccer.com/players/${this.playerName}`;
};

Player.prototype = () => {
	let scrapePlayerData = this.playerURL => {
		
	},

	updateStats = this.playerStats => {
		for (stat in this.playerStats) {
			return null; // for now
		};

	updateClub = this.playerClub => {
		return null; // for now
	};

	// return {

	// }
} ();