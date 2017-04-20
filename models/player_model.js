const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerUniqueID: {type: Number, unique: true},
				playerName: {type: String, unique: true},
				playerURL: {type: String, unique: true},
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
				playerSchedule: Array  // based off playerClub.clubSchedule
			}),

			Player = mongoose.model('Player', playerSchema);

module.exports = Player;