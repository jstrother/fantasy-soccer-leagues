const mongoose = require('mongoose'),

			userSchema = mongoose.Schema({
				name: {type: String, required: true},
				userName: {type: String, unique: true, required: true},
				userPassword: {type: String, required: true},
				userEmail: {type: String, required: true},
				fantasyClub: {type: String, required: true},
				fantasyLeague: String,
				fantasyDivision: String,
				fantasyChampsLeague: Boolean
			}),

			User = mongoose.model('User', userSchema);

module.exports = User;