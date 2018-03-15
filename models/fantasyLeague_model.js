const mongoose = require('mongoose'),
			
			fantasyLeagueSchema = mongoose.Schema({
				Name: { type: String, required: true },
				Clubs: Array,
				Divisions: Array,
				Schedule: Array
			}),

			FantasyLeague = mongoose.model('FantasyLeague', fantasyLeagueSchema);

module.exports = FantasyLeague;