const mongoose = require('mongoose'),

	userSchema = mongoose.Schema({
		displayName: String,
		givenName: String,
		familyName: String,
		userPhoto: String,
		userEmail: String,
		accessToken: {type: String, required: true},
		googleId: {type: String, required: true},
		fantasyLeagueId: Number,
		fantasyLeagueName: String,
		fantasyClubName: String,
		fantasyDivision: String,
		fantasyChampsLeague: Boolean,
	}),

	User = mongoose.model('User', userSchema);

module.exports = User;