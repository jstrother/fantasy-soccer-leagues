const mongoose = require('mongoose'),

			scheduleSchema = mongoose.Schema({
				masterMatchList: {type: Array, uniquie: true},
				numSeasonMatches: Number // simple .length
			}),

			Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;