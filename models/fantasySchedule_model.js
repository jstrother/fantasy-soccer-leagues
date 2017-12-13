const mongoose = require('mongoose'),

	fantasyScheduleSchema = mongoose.Schema({
		masterLeagueSeasonSchedule: {
			
		},
		numLeagueSeasonMatches: Number,
		masterLeagueCupSchedule: {
			
		},
		leagueCupRound: String,
		masterChampsSchedule: {
			
		},
		champsLeagueRound: String
	}),

	FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;

// schedule should reference league season model AND league cup model AND champions league model
// each sub-model should then in turn reference fantasy match model