const mongoose = require('mongoose'),

			scheduleSchema = mongoose.Schema({
				_id: Number,
				masterSchedule: {type: Array, uniquie: true},
				numSeasonMatches: Number,
				scheduleURL: {type: String, uniquie: true}
			}),

			Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;