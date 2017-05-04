const mongoose = require('mongoose'),
	// all models
	FantasyGame = require('../models/fantasyGame_model.js'),
	User = require('../models/user_model.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	FantasyLeague = require('../models/fantasyLeague_model.js'),
	FantasyChampsLeague = require('../models/fantasyChampsLeague_model.js'),
	FantasyMatch = require('../models/fantasyMatch_model.js'),
	FantasySchedule = require('../models/fantasySchedule_model.js'),
	Schedule = require('../models/schedule_model.js'),
	Player = require('../models/player_model.js'),
	// all samples
	sampleFantasyGame = require('../samples/sample-fantasy-game.js'),
	sampleUser = require('../samples/sample-user.js'),
	sampleFantasyClub = require('../samples/sample-fantasy-club.js'),
	sampleFantasyLeague = require('../samples/sample-fantasy-league.js'),
	sampleFantasyChampsLeague = require('../samples/sample-fantasy-champs-league.js'),
	sampleFantasyMatch = require('../samples/sample-fantasy-match.js'),
	sampleFantasySchedule = require('../samples/sample-fantasy-schedule.js'),
	sampleSchedule = require('../samples/sample-schedule.js')
	samplePlayer = require('../samples/sample-player.js'),
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