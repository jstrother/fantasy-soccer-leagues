const mongoose = require('mongoose'),
			
			fantasyChampsLeagueSchema = mongoose.Schema({
				name: {type: String, unique: true},
				leagues: Array,
				clubs: Array,
				schedule: Array
			}),

			FantasyChampsLeague = mongoose.model('FantasyChampsLeague', fantasyChampsLeagueSchema);

module.exports = FantasyChampsLeague;