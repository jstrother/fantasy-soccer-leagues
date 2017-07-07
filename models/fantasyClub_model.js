const mongoose = require('mongoose'),

			fantasyClubSchema = mongoose.Schema({
				Name: { type: String, required: true },
				Manager: { type: String, required: true },
				League: { type: String, required: true},
				Division: { type: String, required: true},
				ChampsLeague: String,
				Schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;