const mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	fantasyScheduleSchema = Schema({
		weeklyMatches: [{type: Schema.Types.ObjectId, ref: 'WeeklyMatches'}],
		startDate: Number
	}),

	FantasySchedule = mongoose.model('FantasySchedule', fantasyScheduleSchema);

module.exports = FantasySchedule;