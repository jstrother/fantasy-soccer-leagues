const mongoose = require('mongoose'),

			fantasyClubSchema = mongoose.Schema({
				name: { type: String, required: true },
				manager: { type: String, required: true },
				league: { type: String, required: true},
				division: { type: String, required: true},
				champsLeague: String,
				schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;