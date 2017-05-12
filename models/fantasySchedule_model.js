const mongoose = require('mongoose'),

			fantasyScheduleSchema = mongoose.Schema({
				masterRegSeasonSchedule: {
					homeClub: String,
					homeScore: Number,
					awayClub: String,
					awayScore: Number
				},
				numRegSeasonMatches: Number,
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