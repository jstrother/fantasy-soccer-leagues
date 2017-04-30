const mongoose = require('mongoose'),
			// model imports
			Player = require('../models/player_model.js'),
			Schedule = require('../models/schedule_model.js'),
			Club = require('../models/club_model.js'),
			Match = require('../models/match_model.js'),
			User = require('../models/user_model.js'),
			FantasyClub = require('../models/fantasyClub_model.js'),
			FantasySchedule = require('../models/fantasySchedule_model.js'),
			FantasyMatch = require('../models/fantasyMatch_model.js'),
			// sample imports
			samplePlayer = require('../sample-player.js'),
			sampleClub = require('../sample-club.js'),
			sampleMatch = require('../sample-match.js'),
			sampleSchedule = require('../sample-schedule.js'),
			sampleUser = require('../sample-user.js'),
			sampleFantasyClub = require('../sample-fantasy-club.js'),
			sampleFantasyMatch = require('../sample-fantasy-match.js'),
			sampleFantasySchedule = require('../sample-fantasy-schedule.js'),
			// import CRUD functions
			{create, read, update, del} = require('../crud_functions.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jim.strother:password@ds161580.mlab.com:61580/fantasy-soccer-leagues');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

mongoose.connection.once('open', () => {
	// create(Player, samplePlayer);
 // create(Club, sampleClub);
 // read(Club, sampleClub);
 // update(Player, samplePlayer, {playerValue: 75});
 // del(Player, {playerFirstName: 'Jim'});
 // del(Club, sampleClub);
});