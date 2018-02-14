const mongoose = require('mongoose'),

	fantasyScheduleSchema = mongoose.Schema({
		fantasyLeague: Array,
		numLeagueSeasonMatches: Number,
		fantasyLeagueCup: Array,
		leagueCupRound: String,
		fantasyChampsLeague: Array,
		champsLeagueRound: String
	}),

	FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;