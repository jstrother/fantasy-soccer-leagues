const mongoose = require('mongoose'),
	Schema = mongoose.Schema,

			fantasyClubSchema = Schema({
				_id: Schema.Types.ObjectId,
				clubName: { type: String, required: true },
				manager: { type: String, required: true },
				goalkeepers: Array,
				defenders: Array,
				midfielders: Array,
				forwards: Array,
				starters: Array,
				benchwarmers: Array
			}),

			FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;