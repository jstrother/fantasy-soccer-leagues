const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerName: String,
				playerIdFromAPI: Number,
				playerClub: String,
				playerPosition: String,
				playerStats: {
					gamesPlayed: Number,
					gamesStarted: Number,
					minutesPlayed: Number,
					goalsScored: Number,
					goalsConceded: Number,
					assists: Number,
					shotsTaken: Number,
					shotsOnGoal: Number,
					foulsDrawn: Number,
					foulsCommitted: Number,
					passes: Number,
					passingAccuracy: Number,
					crosses: Number,
					crossingAccuracy: Number,
					timesOffside: Number,
					yellowCards: Number,
					redCards: Number,
					saves: Number,
					penaltiesScored: Number,
					penaltiesMissed: Number,
					tackles: Number,
					blocks: Number,
					interceptions: Number,
					clearances: Number
				},
				playerValue: Number, // in millions of $$$'s
				playerSchedule: Array,
				playerFantasyPointsWeek: Number,
				playerFantasyPointsTotal: Number
			}),

			Player = mongoose.model('Player', playerSchema);

module.exports = Player;