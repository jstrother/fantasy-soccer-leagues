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
		wins: {type: Number, default: 0},
		draws: {type: Number, default: 0},
		losses: {type: Number, default: 0},
		goalsFor: {type: Number, default: 0},
		goalsAgainst: {type: Number, default: 0},
		goalDifferential: {type: Number, default: 0}
		// ranking starts with points, then goalDifferential, then goalsFor, finally goalsAgainst
	}),

	FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;