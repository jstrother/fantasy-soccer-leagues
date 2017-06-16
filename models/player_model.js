const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerCommonName: String,
				playerFirstName: String,
				playerLastName: String,
				playerPictureLink: String,
				playerIdFromAPI: Number,
				playerClub: String,
				playerClubIdFromAPI: Number,
				playerPositionId: Number,
				playerPosition: String,
				playerStats: {
					gamesPlayed: Number,
					minutesPlayed: Number,
	        goalsScored: Number,
	        goalsConceded: Number,
	        assists: Number,
	    		shotsTaken: Number,
	    		shotsOnGoal: Number,
	    		foulsDrawn: Number,
	    		foulsCommitted: Number,
	    		yellowCards: Number,
	    		yellowRedCards: Number,
	    		redCards: Number,
	    		passes: Number,
	    		passingAccuracy: Number,
	    		crosses: Number,
	    		crossingAccuracy: Number,
	    		timesOffside: Number,
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