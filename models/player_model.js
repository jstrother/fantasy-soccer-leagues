const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerName: String,
				playerURL: {type: String, unique: true},
				playerClub: String,
				playerPosition: String,
				gamesPlayed: Number,
				gamesStarted: Number,
				minutesPlayed: Number,
				goals: Number,
				assists: Number,
				shotsTaken: Number,
				shotsOnGoal: Number,
				foulsCommitted: Number,
				timesOffside: Number,
				yellowCards: Number,
				redCards: Number,
				playerValue: Number, // in millions of $$$'s
				playerSchedule: Array  // based off playerClub.clubSchedule
			}),

			// playerSchema.virtual('playerStats').get(() => {
			// 	return [
			// 		this.gamesPlayed,
			// 		this.gamesStarted,
			// 		this.minutesPlayed,
			// 		this.goals,
			// 		this.assists,
			// 		this.shotsTaken,
			// 		this.shotsOnGoal,
			// 		this.foulsCommitted,
			// 		this.timesOffside,
			// 		this.yellowCards,
			// 		this.redCards
			// 	];
			// }),

			Player = mongoose.model('Player', playerSchema);

module.exports = Player;