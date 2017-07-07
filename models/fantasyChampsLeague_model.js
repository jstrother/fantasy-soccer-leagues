const mongoose = require('mongoose'),
			
			fantasyChampsLeagueSchema = mongoose.Schema({
				Name: {type: String, unique: true},
				Leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyLeague' }],
				Clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub' }],
				Schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyChampsLeague = mongoose.model('FantasyChampsLeague', fantasyChampsLeagueSchema);

module.exports = FantasyChampsLeague;