const mongoose = require('mongoose'),

			fantasyScheduleSchema = mongoose.schema({
				masterRegSeasonSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				numRegSeasonMatches: Number,
				masterLeagueCupSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				leagueCupRoundTracker: Function,
				masterChampsSchedule: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
				champsRoundTracker: Function,
				champsGroupStage: Boolean
			}),

			FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

export default FantasySchedule;