const mongoose = require('mongoose'),

			matchSchema = mongoose.Schema({
				matchUniqueID: {type: String, unique: true},
				homeClub: {type: String, unique: true},
				awayClub: {type: String, unique: true},
				homeScore: Number,
				awayScore: Number,
				matchDate: Date
			}),

			Match = mongoose.model('Match', matchSchema);

export default Match;