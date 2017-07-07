const mongoose = require('mongoose'),

			fantasyMatchSchema = mongoose.Schema({
			  matchType: String,
        homeClub: String,
        homeScore: Number,
        awayClub: String,
        awayScore: Number
			}),

			FantasyMatch = mongoose.model('FantasyMatch', fantasyMatchSchema);

module.exports = FantasyMatch;