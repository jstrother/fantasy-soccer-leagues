const mongoose = require('mongoose'),

			scheduleSchema = mongoose.Schema({
				masterSchedule: {
					homeClub: String,
					homeScore: Number,
					awayClub: String,
					awayScore: Number
				},
				numSeasonMatches: Number
			}),

			Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;