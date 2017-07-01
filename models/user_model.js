const mongoose = require('mongoose'),

	userSchema = mongoose.Schema({
		displayName: String,
		firstName: String,
		lastName: String,
		userPhoto: String,
		userEmail: String,
		accessToken: {type: String, required: true},
		googleId: {type: String, required: true},
		fantasyClubName: String,
		fantasyLeague: String,
		fantasyDivision: String,
		fantasyChampsLeague: Boolean
	}),

	User = mongoose.model('User', userSchema);

module.exports = User;