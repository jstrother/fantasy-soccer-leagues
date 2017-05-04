const mongoose = require('mongoose'),
			
			fantasyChampsLeagueSchema = mongoose.Schema({
				_id: Number,
				fantasyChampsLeagueName: String,
				fantasyChampsLeagueRegLeagues: {type: Array, unique: true},
				fantasyChampsLeagueClubs: {type: Array, unique: true},
				fantasyChampsLeagueSchedule: {type: Array, unique: true}
			}),

			FantasyChampsLeague = mongoose.model('FantasyChampsLeague', fantasyChampsLeagueSchema);

module.exports = FantasyChampsLeague;