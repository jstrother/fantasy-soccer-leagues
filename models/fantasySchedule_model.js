const mongoose = require('mongoose'),

	fantasyScheduleSchema = mongoose.Schema({
		fantasyLeague: [{type: mongoose.Schema.Types.ObjectId, ref: 'FantasyLeague'}],
		numLeagueSeasonMatches: Number,
		fantasyLeagueCup: [{type: mongoose.Schema.Types.ObjectId, ref: 'FantasyLeagueCup'}],
		leagueCupRound: String,
		fantasyChampsLeague: [{type: mongoose.Schema.Types.ObjectId, ref: 'FantasyChampsLeague'}],
		champsLeagueRound: String
	}),

	FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;