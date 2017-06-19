const mongoose = require('mongoose'),

	userSchema = mongoose.Schema({
		name: {type: String, required: true},
		accessToken: {type: String, required: true},
		googleId: {type: String, required: true},
		fantasyClub: String,
		fantasyLeague: String,
		fantasyDivision: String,
		fantasyChampsLeague: Boolean
	}),

	User = mongoose.model('User', userSchema);

module.exports = User;