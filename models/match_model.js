const mongoose = require('mongoose'),

			matchSchema = mongoose.Schema({
				homeClub: String,
				awayClub: String,
				homeScore: Number,
				awayScore: Number,
				matchDate: Date
			}),

			Match = mongoose.model('Match', matchSchema);

module.exports = Match;