const mongoose = require('mongoose'),
			
			fantasyDivisionSchema = mongoose.Schema({
			  name: { type: String, required: true },
				clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub' }],
				schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyDivision = mongoose.model('FantasyDivision', fantasyDivisionSchema);

module.exports = FantasyDivision;