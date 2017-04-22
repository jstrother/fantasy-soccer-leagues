const mongoose = require('mongoose'),

			userSchema = mongoose.Schema({
				schemaType: String,
				userName: {type: String, unique: true},
				userPassword: String,
				fantasyClub: {type: Object, unique: true},
				fantasyLeague: String,
				fantasyDivision: String,
				fantasyChampsLeague: Boolean
			}),

			User = mongoose.model('User', userSchema);

module.exports = User;