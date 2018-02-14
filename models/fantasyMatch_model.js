const mongoose = require('mongoose'),

	fantasyMatchSchema = mongoose.Schema({
	  matchId: {type: Number, required: true},
    homeClub: { type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
    homeScore: { type: Number, required: true },
    awayClub: { type: mongoose.Schema.Types.ObjectId, ref: 'FantasyClub', required: true },
    awayScore: { type: Number, required: true },
    leagueType: { type: String, required: true }  //regular league, league cup, or champions league
	}),

	FantasyMatch = mongoose.model('FantasyMatch', fantasyMatchSchema);

module.exports = FantasyMatch;