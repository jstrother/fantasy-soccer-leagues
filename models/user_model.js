const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	
	userSchema = mongoose.Schema({
		// _id: Schema.Types.ObjectId,
		displayName: String,
		givenName: String,
		familyName: String,
		userPhoto: String,
		userEmail: String,
		accessToken: {type: String, required: true},
		googleId: {type: String, required: true},
		fantasyLeagueId: Number,
		fantasyLeagueName: String
	}),

	User = mongoose.model('User', userSchema);

module.exports = User;