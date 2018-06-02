const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	
	fantasyMatchSchema = Schema({
    _id: Schema.Types.ObjectId,
    homeClub: { type: Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
    homeScore: { type: Number, required: true, default: 0 },
    awayClub: { type: Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
    awayScore: { type: Number, required: true, default: 0 },
    final: { type: Boolean, required: true, default: false }
	}),

	FantasyMatch = mongoose.model('FantasyMatch', fantasyMatchSchema);

module.exports = FantasyMatch;