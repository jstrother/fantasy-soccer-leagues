const mongoose = require('mongoose'),
			
			fantasyLeagueCupSchema = mongoose.Schema({
				Name: { type: String, required: true },
				Divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyDivision' }],
				Clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub' }],
				Schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FantasyMatch' }]
			}),

			FantasyLeagueCup = mongoose.model('FantasyLeagueCup', fantasyLeagueCupSchema);

module.exports = FantasyLeagueCup;