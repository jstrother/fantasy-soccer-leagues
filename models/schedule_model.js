const mongoose = require('mongoose'),

			scheduleSchema = mongoose.Schema({
				masterSchedule: {type: Array, unique: true},
				numSeasonMatches: 374
			}),

			Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;