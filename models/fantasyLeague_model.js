const mongoose = require('mongoose'),
			
			fantasyLeagueSchema = mongoose.Schema({
				Name: { type: String, required: true },
				Clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub' }],
				Divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyDivision' }],
				Schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyLeague = mongoose.model('FantasyLeague', fantasyLeagueSchema);

module.exports = FantasyLeague;