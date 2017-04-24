const mongoose = require('mongoose'),

			fantasyMatchSchema = mongoose.Schema({
				homeClub: {type: String, unique: true},
				awayClub: {type: String, unique: true},
				homeScore: Number,
				awayScore: Number
			}),

			FantasyMatch = mongoose.model('FantasyMatch', fantasyMatchSchema);

module.exports = FantasyMatch;