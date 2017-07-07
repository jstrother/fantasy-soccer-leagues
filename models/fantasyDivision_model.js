const mongoose = require('mongoose'),
			
			fantasyDivisionSchema = mongoose.Schema({
			  Name: { type: String, required: true },
				Clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub' }],
				Schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyDivision = mongoose.model('FantasyDivision', fantasyDivisionSchema);

module.exports = FantasyDivision;