const mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	fantasyClubSchema = Schema({
		_id: Schema.Types.ObjectId,
		clubName: String,
		manager: {type: Schema.Types.ObjectId, ref: 'User'},
		leagueScheduleId: {type: Schema.Types.ObjectId, ref: 'FantasySchedule'},
		goalkeepers: Array,
		defenders: Array,
		midfielders: Array,
		forwards: Array,
		starters: Array,
		benchwarmers: Array,
		wins: Number,
		draws: Number,
		losses: Number,
		goalsFor: Number,
		goalsAgainst: Number,
		goalDifferential: Number
		// ranking starts with points, then goalDifferential, then goalsFor
	}),

	FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;