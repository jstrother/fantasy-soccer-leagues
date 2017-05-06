const mongoose = require('mongoose'),

			fantasyGameSchema = mongoose.Schema({
				fantasyUsers: Array,
				fantasyClubs: Array,
				fantasyLeagues: Array,
				fantasyChampsLeagues: Array,
				fantasySchedules: Array,
				fantasyMatches: Array,
				realPlayers: Array,
				realSchedule: Array
			}),

			fantasyGame = mongoose.model('FantasyGame', fantasyGameSchema);

module.exports = fantasyGame;