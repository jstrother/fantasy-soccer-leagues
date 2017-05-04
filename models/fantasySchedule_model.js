const mongoose = require('mongoose'),

			fantasyScheduleSchema = mongoose.Schema({
				_id: Number,
				masterRegSeasonSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				numRegSeasonMatches: Number,
				masterLeagueCupSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				leagueCupRound: String,
				masterChampsSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				champsRound: String,
				champsGroupStage: Boolean
			}),

			FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;