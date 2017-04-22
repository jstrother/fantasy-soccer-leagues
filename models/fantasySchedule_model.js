const mongoose = require('mongoose'),

			fantasyScheduleSchema = mongoose.Schema({
				schemaType: String,
				masterRegSeasonSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				numRegSeasonMatches: Number,
				masterLeagueCupSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				leagueCupRoundTracker: String,
				masterChampsSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				champsRoundTracker: String,
				champsGroupStage: Boolean
			}),

			FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;