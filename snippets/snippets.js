const mongoose = require('mongoose'),
			Player = require('../models/player_model.js'),
			Schedule = require('../models/schedule_model.js'),
			Club = require('../models/club_model.js'),
			Match = require('../models/match_model.js'),
			User = require('../models/user_model.js'),
			FantasyClub = require('../models/fantasyClub_model.js'),
			FantasySchedule = require('../models/fantasySchedule_model.js'),
			FantasyMatch = require('../models/fantasyMatch_model.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

// moving schema into separate model files
mongoose.connection.once('open', () => {

});