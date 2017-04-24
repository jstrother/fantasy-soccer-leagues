const mongoose = require('mongoose'),

			clubSchema = mongoose.Schema({
				clubName: {type: String, unique: true}, // taken from an array of player.playerClub
				clubRoster: [{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Player' 
				}],
				clubSchedule: {type: Array, unique: true}  // sorted out from schedule.masterSchedule
			}),

			Club = mongoose.model('Club', clubSchema);

module.exports = Club;