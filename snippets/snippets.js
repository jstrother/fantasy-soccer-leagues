const mongoose = require('mongoose'),
			player = require('../models/player_model.js'),
			schedule = require('../models/schedule_model.js'),
			club = require('../models/club_model.js'),
			match = require('../models/match_model.js'),
			user = require('../models/user_model.js'),
			fantasyClub = require('../models/fantasyClub_model.js'),
			fantasySchedule = require('../models/fantasySchedule_model.js'),
			fantasyMatch = require('../models/fantasyMatch_model.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

// moving schema into separate model files
mongoose.connection.once('open', () => {

});