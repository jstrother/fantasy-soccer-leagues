const mongoose = require('mongoose'),

	fantasyScheduleSchema = mongoose.Schema({
		numLeagueSeasonMatches: Number,
		matches: Array
	}),

	FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;