const mongoose = require('mongoose'),
			
	fantasyLeagueCupSchema = mongoose.Schema({
		Name: { type: String, required: true },
		Divisions: Array,
		Clubs: Array,
		Schedule: Array
	}),

	FantasyLeagueCup = mongoose.model('FantasyLeagueCup', fantasyLeagueCupSchema);

module.exports = FantasyLeagueCup;