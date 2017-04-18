const mongoose = require('mongoose'),

			fantasyClubSchema = mongoose.Schema({
				fantasyClubName: {type: String, unique: true},
				fantasyClubManager: {type: String, unique: true},
				fantasyClubLeague: String,
				fantasyLeagueSchedule: {type: Function, unique: true},
				fantasyClubDivision: String,
				fantasyDivision: {type: Function, unique: true},
				fantasyClubChampsLeague: Boolean,
				fantasyChampsLeagueSchedule: {type: Function, unique: true}
			}),

			FantasyClub = mongoose.model('FantasyClub', fantasyClubSchema);

export default FantasyClub;