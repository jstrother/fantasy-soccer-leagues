const mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),

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
	
userSchema.methods.validatePassword = userPassword => {
	bcrypt.compare(userPassword, this.userPassword, isValid => {
		return isValid;
	})
	.catch(error => {
		console.log(`Password Authentication Error: ${error}`);
	});
};

module.exports = User;