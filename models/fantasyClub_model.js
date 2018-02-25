const mongoose = require('mongoose'),

			fantasyClubSchema = mongoose.Schema({
				clubName: { type: String, required: true },
				manager: { type: String, required: true },
				league: String,
				division: String,
				goalkeepers: Array,
				defenders: Array,
				midfielders: Array,
				forwards: Array,
				starters: Array,
				benchwarmers: Array,
				champsLeague: String,
				schedule: Array
			}),

			FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;