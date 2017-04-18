const mongoose = require('mongoose'),

			playerSchema = mongoose.Schema ({
				playerUniqueID: {type: String, unique: true},
				playerURL: {type: String, unique: true},
				playerName: {type: String, unique: true},
				playerClub: String,
				playerPosition: String,
				playerStats: Array,
				playerValue: Number, // in millions of $$$'s
				playerSchedule: Function  // based off playerClub.clubSchedule
			}),

			Player = mongoose.model('Player', playerSchema);

export default Player;