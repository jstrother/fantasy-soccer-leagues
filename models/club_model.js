const mongoose = require('mongoose'),

			clubSchema = mongoose.Schema({
				schemaType: String,
				clubName: {type: String, unique: true}, // taken from an array of player.playerClub
				clubRoster: [{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Player' 
				}], // .push(player.playerUniqueID)
				clubSchedule: {type: Array, unique: true}  // sorted out from schedule.masterSchedule
			}),

			Club = mongoose.model('Club', clubSchema);

module.exports = Club;