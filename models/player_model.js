const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerUniqueID: {type: String, unique: true},
				playerURL: {type: String, unique: true},
				playerName: {type: String, unique: true},
				playerClub: String,
				playerPosition: String,
				playerStats: Array,
				playerValue: Number, // in millions of $$$'s
				matchDayList: Function  // based off playerClub.matchDayList
			}),

			Player = mongoose.model('Player', playerSchema);

module.exports = Player;