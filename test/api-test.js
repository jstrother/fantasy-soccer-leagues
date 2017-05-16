const 
	$ = require('jquery')(require('node-jsdom').jsdom().parentWindow),
    // import common modules
    { mongoose, serverTestConnection } = require('./common.js'),
    // import server
    server = require('../server.js'),
    // import api functions
    { scheduleGrabber } = require('../api_functions.js'),
	// all models
	User = require('../models/user_model.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	FantasyLeague = require('../models/fantasyLeague_model.js'),
	FantasyChampsLeague = require('../models/fantasyChampsLeague_model.js'),
	FantasyMatch = require('../models/fantasyMatch_model.js'),
	FantasySchedule = require('../models/fantasySchedule_model.js'),
	Schedule = require('../models/schedule_model.js'),
	Player = require('../models/player_model.js');
	
before(done => {
	mongoose.connect(serverTestConnection);
	mongoose.connection.on('connected', () => {
		console.log('connection made');
		mongoose.connection.db.dropDatabase();
	});
	done();
});

after(done => {
	mongoose.disconnect();
	mongoose.connection.on('disconnected', () => {
		console.log('disconnected');
		mongoose.connection.db.dropDatabase();
	});
	done();
});
	
describe('MLS Schedule', () => {
    it('should retrieve current MLS schedule', () => {
    	return scheduleGrabber(117);
    });
});