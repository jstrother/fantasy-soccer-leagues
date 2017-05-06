const mongoose = require('mongoose'),
			
			fantasyLeagueSchema = mongoose.Schema({
				fantasyLeagueName: String,
				fantasyLeagueDivisions: Number,
				fantasyLeagueClubs: {type: Array, unique: true},
				fantasyLeagueSchedule: {type: Array, unique: true}
			}),

			FantasyLeague = mongoose.model('FantasyLeague', fantasyLeagueSchema);

module.exports = FantasyLeague;