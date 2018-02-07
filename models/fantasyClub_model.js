const mongoose = require('mongoose'),

			fantasyClubSchema = mongoose.Schema({
				clubName: { type: String, required: true },
				manager: { type: String, required: true },
				league: String,
				division: String,
				roster: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
				starters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
				benchwarmers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
				reserves: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
				champsLeague: String,
				schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;