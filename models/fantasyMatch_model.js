const mongoose = require('mongoose'),

	fantasyMatchSchema = mongoose.Schema({
	  matchId: {type: Number, required: true},
    homeClub: { type: Object, required: true },
    homeScore: { type: Number, required: true },
    awayClub: { type: Object, required: true },
    awayScore: { type: Number, required: true }
	}),

	FantasyMatch = mongoose.model('FantasyMatch', fantasyMatchSchema);

module.exports = FantasyMatch;