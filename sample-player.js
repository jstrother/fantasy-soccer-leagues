let samplePlayer = {
	playerName: 'Jim Strother',
	playerClub: 'Seattle Sounders FC',
	playerPosition: 'Midfielder',
	playerStats: {
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
	},
	playerValue: 50, // $USD in millions
	playerSchedule: [
		'@ Portland',
		'Vancouver'
	]
};

samplePlayer.playerURL = `http://www.mlssoccer.com/players/${samplePlayer.playerName.split(' ').join('-')}`;

module.exports = samplePlayer;