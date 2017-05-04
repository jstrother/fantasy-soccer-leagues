const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	should = chai.should(),
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
	sampleFantasyGame = require('../sample-fantasy-game.js'),
	sampleUser = require('../sample-user.js'),
	sampleFantasyClub = require('../sample-fantasy-club.js'),
	sampleFantasyLeague = require('../sample-fantasy-league.js'),
	sampleFantasyChampsLeague = require('../sample-fantasy-champs-league.js'),
	sampleFantasyMatch = require('../sample-fantasy-match.js'),
	sampleFantasySchedule = require('../sample-fantasy-schedule.js'),
	sampleSchedule = require('../sample-schedule.js')
	samplePlayer = require('../sample-player.js');

mongoose.Promise = global.Promise;

console.log('Run Date/Time', Date.now());

describe('FantasyGame', function() {
	before(function(done) {
		mongoose.createConnection('mongodb://jim.strother:password@ds161169.mlab.com:61169/fantasy-soccer-test');
		done();
	});
	beforeEach(function(done) {
		mongoose.connection.on('connected', function() {
			mongoose.connection.dropDatabase();
		});
		done();
	});
	// afterEach();
	after(function(done) {
		mongoose.disconnect();
		done();
	});

	describe('Champions League', function() {
		it('should not exist', function(done) {
			checkIfExists(sampleFantasyChampsLeague, FantasyGame);
			done();
		});
		it('should create a new champions league', function(done) {
			createNew(sampleFantasyChampsLeague, FantasyGame);
			done();
		});
		it('should update a champions league', function(done) {
			updateExisting(sampleFantasyChampsLeague, 'fantasyChampsLeagueName', 'Champions 2', FantasyGame);
			done();
		});
		it('should remove a champions league', function(done) {
			deleteExisting(sampleFantasyChampsLeague, FantasyGame);
			done();
		});
	});

	describe('Fantasy Match', function(done) {
		it('should not exist', function(done) {
			checkIfExists(sampleFantasyMatch, FantasyGame);
			done();
		});
		it('should create a new champions league', function(done) {
			createNew(sampleFantasyMatch, FantasyGame);
			done();
		});
		it('should update a champions league', function(done) {
			updateExisting(sampleFantasyMatch, 'homeClub', 'a third team', FantasyGame);
			done();
		});
		it('should remove a champions league', function(done) {
			deleteExisting(sampleFantasyMatch, FantasyGame);
			done();
		});
	});

	describe('Fantasy Schedule', function(done) {
		it('should not exist', function(done) {
			checkIfExists(FantasySchedule, FantasyGame);
			done();
		});
		it('should create a new champions league', function(done) {
			createNew(FantasySchedule, FantasyGame);
			done();
		});
		it('should update a champions league', function(done) {
			updateExisting(FantasySchedule, 'masterRegSeasonSchedule', 'a third team @ fantasy team', FantasyGame);
			done();
		});
		it('should remove a champions league', function(done) {
			deleteExisting(FantasySchedule, FantasyGame);
			done();
		});
	});

	describe('Player', function(done) {
		it('should not exist', function(done) {
			checkIfExists(Player, FantasyGame);
			done();
		});
		it('should create a new champions league', function(done) {
			createNew(Player, FantasyGame);
			done();
		});
		it('should update a champions league', function(done) {
			updateExisting(Player, 'playerPosition', 'Defender', FantasyGame);
			done();
		});
		it('should remove a champions league', function(done) {
			deleteExisting(Player, FantasyGame);
			done();
		});
	});

	describe('Schedule', function(done) {
		it('should not exist', function(done) {
			checkIfExists(Schedule, FantasyGame);
			done();
		});
		it('should create a new champions league', function(done) {
			createNew(Schedule, FantasyGame);
			done();
		});
		it('should update a champions league', function(done) {
			updateExisting(Schedule, 'masterSchedule', 'Vancouver Whitecaps FC @ Seattle Sounders FC', FantasyGame);
			done();
		});
		it('should remove a champions league', function(done) {
			deleteExisting(Schedule, FantasyGame);
			done();
		});
	});

	describe('User', function() {
		it('should not exist', function(done) {
			checkIfExists(sampleUser, FantasyGame);
			done();
		});
		it('should create a new user', function(done) {
			createNew(sampleUser, FantasyGame);
			done();
		});
		it('should update a user', function(done) {
			updateExisting(sampleUser, 'userName', 'user2', FantasyGame);
			done();
		});
		it('should delete a user', function(done) {
			deleteExisting(sampleUser, FantasyGame);
			done();
		});

		describe('Fantasy Club', function() {
			it('should not exist', function(done) {
				checkIfExists(sampleFantasyClub, User);
				done();
			});
			it('should create new fantasy club', function(done) {
				createNew(sampleFantasyClub, User);
				done();
			});
			it('should update a fantasy club', function(done) {
				updateExisting(sampleFantasyClub, 'fantasyClubDivision', 'Division 2', User);
				done();
			});
			it('should remove a fantasy club', function(done) {
				deleteExisting(sampleFantasyClub, User);
				done();
			});
		});

		describe('Fantasy League', function() {
			it('should not exist', function(done) {
				checkIfExists(sampleFantasyLeague, User);
				done();
			});
			it('should create a new fantasy league', function(done) {
				createNew(sampleFantasyLeague, User);
				done();
			});
			it('should update a fantasy league', function(done) {
				updateExisting(sampleFantasyLeague, 'fantasyLeagueName', 'Another Fantasy League', User);
				done();
			});
			it('should remove a fantasy league', function(done) {
				deleteExisting(sampleFantasyLeague, User);
				done();
			});
		});
	});
});

function errorCheck(error, query) {
	if (error || !query) {
		console.error(`Could not read ${query}`);
		console.log(`Error: ${error}`);
		console.log(`Run Date: ${Date.now()}`);
	}
}

function checkIfExists(query, model) {
	model.findOne(query._id).exec()
	.then(function() {
		return (query.should.not.exist);
	})
	.catch(function(error) {
		errorCheck(error, query);
	});
}

function createNew(query, model) {
	model.create(query)
	.then(function() {
		return (query.should.exist);
	})
	.catch(function(error) {
	errorCheck(error, query);
	});
}

function updateExisting(query, updatedKey, updatedValue, model) {
	model.findOneAndUpdate(query._id, {updatedKey: updatedValue}).exec()
	.then(function() {
		return (query.updatedKey.should.match(updatedValue));
	})
	.catch(function(error) {
		errorCheck(error, query);
	});
}

function deleteExisting(query, model) {
	model.findOneAndRemove(sampleFantasyClub._id).exec()
	.then(function() {
		return (query.should.not.exist);
	})
	.catch(function(error) {
		errorCheck(error, query);
	});
}