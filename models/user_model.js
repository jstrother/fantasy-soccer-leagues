const mongoose = require('mongoose'),

			userSchema = mongoose.Schema({
				userName: {type: String, unique: true},
				userPassword: String,
				fantasyClub: {type: Object, unique: true},
				fantasyLeague: String,
				fantasyDivision: String,
				fantasyChampsLeague: Boolean
			}),

			User = mongoose.model('User', userSchema);

export default User;