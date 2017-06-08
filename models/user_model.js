const mongoose = require('mongoose'),

			userSchema = mongoose.Schema({
				name: String,
				userName: {type: String, unique: true},
				userPassword: String,
				userEmail: String,
				fantasyClub: String,
				fantasyLeague: String,
				fantasyDivision: String,
				fantasyChampsLeague: Boolean
			}),

			User = mongoose.model('User', userSchema);

module.exports = User;