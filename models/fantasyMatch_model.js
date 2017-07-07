const mongoose = require('mongoose'),

			fantasyMatchSchema = mongoose.Schema({
			  matchType: { type: String, required: true },
        homeClub: { type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
        homeScore: { type: Number, required: true },
        awayClub: { type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
        awayScore: { type: Number, required: true }
			}),

			FantasyMatch = mongoose.model('FantasyMatch', fantasyMatchSchema);

module.exports = FantasyMatch;