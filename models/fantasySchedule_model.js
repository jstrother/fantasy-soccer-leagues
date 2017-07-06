const mongoose = require('mongoose'),

			fantasyScheduleSchema = mongoose.Schema({
				matchType: String, // place these onto fantasy match model
				masterLeagueSeasonSchedule: {
					homeClub: String, // place these onto fantasy match model
					homeScore: Number, // place these onto fantasy match model
					awayClub: String, // place these onto fantasy match model
					awayScore: Number // place these onto fantasy match model
				},
				numLeagueSeasonMatches: Number,
				masterLeagueCupSchedule: {
					homeClub: String,
					homeScore: Number,
					awayClub: String,
					awayScore: Number
				},
				leagueCupRound: String,
				masterChampsSchedule: {
					homeClub: String,
					homeScore: Number,
					awayClub: String,
					awayScore: Number
				},
				champsRound: String,
				champsGroupStage: Boolean
			}),

			FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;

// schedule should reference league season model AND league cup model AND champions league model
// each sub-model should then in turn reference fantasy match model
// isLeagueMatch AND isCupMatch must be opposite one another