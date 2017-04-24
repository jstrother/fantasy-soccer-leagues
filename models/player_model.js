const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerName: String,
				playerURL: String,
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


// playersURL = 'http://www.mlssoccer.com/players?page=', // playersURL ends as it does so that a for loop from 0-20 can be used via concatenation, there are 30 players per page max