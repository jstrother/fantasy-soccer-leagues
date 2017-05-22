const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerName: String,
				playerClub: String,
				playerPosition: String,
				playerStats: {
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
					redCards: Number
				},
				playerValue: Number, // in millions of $$$'s
				playerSchedule: Array,
				playerFantasyPoints: Number
			}),

			Player = mongoose.model('Player', playerSchema);

module.exports = Player;