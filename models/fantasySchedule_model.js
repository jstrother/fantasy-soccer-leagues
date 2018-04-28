const mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	fantasyScheduleSchema = Schema({
		weeklyMatches: [{type: Schema.Types.ObjectId, ref: 'WeeklyMatches'}],
		startDate: Date
	}),

	FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;