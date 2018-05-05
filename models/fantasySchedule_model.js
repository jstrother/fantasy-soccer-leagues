const mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	fantasyScheduleSchema = Schema({
		weeklyMatches: [{type: Schema.Types.ObjectId, ref: 'WeeklyMatches'}],
		startDate: Date,
		scheduleCreated: Boolean,
		scheduleFetched: Boolean
	}),

	FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;