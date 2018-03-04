const mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	fantasyMatchSchema = Schema({
	  _id: Schema.Types.ObjectId,
    homeClub: { type: Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
    homeScore: { type: Number, required: true },
    awayClub: { type: Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
    awayScore: { type: Number, required: true },
    final: { type: Boolean, required: true }
	}),

	FantasyMatch = mongoose.model('FantasyMatch', fantasyMatchSchema);

module.exports = FantasyMatch;