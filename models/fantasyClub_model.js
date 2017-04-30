const mongoose = require('mongoose'),

			fantasyClubSchema = mongoose.Schema({
				_id: Number,
				fantasyClubName: {type: String, unique: true},
				fantasyClubManager: {type: String, unique: true},
				fantasyClubLeague: String,
				fantasyClubDivision: String,
				fantasyLeagueSchedule: {type: Array, unique: true},
				fantasyClubChampsLeague: Boolean,
				fantasyChampsLeagueSchedule: {type: Array, unique: true}
			}),

			FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

module.exports = FantasyClub;