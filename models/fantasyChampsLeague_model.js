const mongoose = require('mongoose'),
			
			fantasyChampsLeagueSchema = mongoose.Schema({
				name: {type: String, unique: true},
				leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyLeague' }],
				clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub' }],
				schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyChampsLeague = mongoose.model('FantasyChampsLeague', fantasyChampsLeagueSchema);

module.exports = FantasyChampsLeague;