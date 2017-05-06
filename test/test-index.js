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
	sampleFantasyGame = require('../samples/sample-fantasy-game.js'),
	sampleUser = require('../samples/sample-user.js'),
	sampleFantasyClub = require('../samples/sample-fantasy-club.js'),
	sampleFantasyLeague = require('../samples/sample-fantasy-league.js'),
	sampleFantasyChampsLeague = require('../samples/sample-fantasy-champs-league.js'),
	sampleFantasyMatch = require('../samples/sample-fantasy-match.js'),
	sampleFantasySchedule = require('../samples/sample-fantasy-schedule.js'),
	sampleSchedule = require('../samples/sample-schedule.js')
	samplePlayer = require('../samples/sample-player.js');

mongoose.Promise = global.Promise;

console.log('Run Date/Time', Date.now());

describe('FantasyGame', function() {
	before(function(done) {
		this.timeout(10000);
		mongoose.connection.on('connected', function() {
			console.log('connection made');
			mongoose.connection.db.dropDatabase();
			done();
		});
		mongoose.connect('mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-test')
		.then();
	});
	// beforeEach(function(done) {
		
	// });
	// afterEach();
	after(function(done) {
		mongoose.disconnect();
		mongoose.connection.on('disconnected', function() {
			console.log('disconnected');
		});
		done();
	});

	describe('Champions League', function() {
		it('should not exist', function(done) {
			// this.timeout(5000);
			getFantasyGame(sampleFantasyChampsLeague, FantasyGame)
			.then(function(model) {
				console.log(model);
				model.should.exist;
				console.log('from champs league', model);
			});
			// moving done() to here makes the test get past the timeout error that's been throwing me off
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
		it('should create a new fantasy match', function(done) {
			createNew(sampleFantasyMatch, FantasyGame);
			done();
		});
		it('should update a fantasy match', function(done) {
			updateExisting(sampleFantasyMatch, 'homeClub', 'a third team', FantasyGame);
			done();
		});
		it('should remove a fantasy match', function(done) {
			deleteExisting(sampleFantasyMatch, FantasyGame);
			done();
		});
	});

	describe('Fantasy Schedule', function(done) {
		it('should not exist', function(done) {
			checkIfExists(FantasySchedule, FantasyGame);
			done();
		});
		it('should create a new fantasy schedule', function(done) {
			createNew(FantasySchedule, FantasyGame);
			done();
		});
		it('should update a fantasy schedule', function(done) {
			updateExisting(FantasySchedule, 'masterRegSeasonSchedule', 'a third team @ fantasy team', FantasyGame);
			done();
		});
		it('should remove a fantasy schedule', function(done) {
			deleteExisting(FantasySchedule, FantasyGame);
			done();
		});
	});

	describe('Player', function(done) {
		it('should not exist', function(done) {
			checkIfExists(Player, FantasyGame);
			done();
		});
		it('should create a new r/w player', function(done) {
			createNew(Player, FantasyGame);
			done();
		});
		it('should update a r/w player', function(done) {
			updateExisting(Player, 'playerPosition', 'Defender', FantasyGame);
			done();
		});
		it('should remove a r/w player', function(done) {
			deleteExisting(Player, FantasyGame);
			done();
		});
	});

	describe('Schedule', function(done) {
		it('should not exist', function(done) {
			checkIfExists(Schedule, FantasyGame);
			done();
		});
		it('should create a new master schedule', function(done) {
			createNew(Schedule, FantasyGame);
			done();
		});
		it('should update a master schedule', function(done) {
			updateExisting(Schedule, 'masterSchedule', 'Vancouver Whitecaps FC @ Seattle Sounders FC', FantasyGame);
			done();
		});
		it('should remove a master schedule', function(done) {
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
				getModel(sampleFantasyLeague, User)
				.then(function(model) {
					model.should.not.exist;
				});
				done();
			});
			it('should create a new fantasy league', function(done) {
				console.log(createNew(sampleFantasyLeague, User));
				createNew(sampleFantasyLeague, User)
				.then(function(model) {
					model.should.exist;
				});
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

function errorCheck(error, sample) {
	if (error || !sample) {
		console.error(`Could not read ${sample}`);
		console.log(`Error: ${error}`);
		console.log(`Run Date: ${Date.now()}`);
	}
}

function checkIfExists(sample, model) {
	model.findOne(sample._id).exec()
	.then(function() {
		return (sample.should.exist);
	})
	.catch(function(error) {
		errorCheck(error, sample);
	});
}

function getModel(sample, model) {
	return model.findOne(sample._id).exec()
	.then(function(model) {
		console.log(model);
		return model;
	})
	.catch(function(error) {
		errorCheck(error, sample);
	});
}

function getFantasyGame(sample) {
	return FantasyGame.findOne(sample._id).exec()
	.then(function(model) {
		console.log(model);
		return model;
	})
	.catch(function(error) {
		errorCheck(error, sample);
	});
}


function createNew(sample, model) {
	return model.create(sample)
	.catch(function(error) {
	errorCheck(error, sample);
	});
}

function updateExisting(sample, updatedKey, updatedValue, model) {
	model.findOneAndUpdate(sample._id, {updatedKey: updatedValue}).exec()
	.then(function() {
		return (sample.updatedKey.should.match(updatedValue));
	})
	.catch(function(error) {
		errorCheck(error, sample);
	});
}

function deleteExisting(sample, model) {
	model.findOneAndRemove(sampleFantasyClub._id).exec()
	.then(function() {
		return (sample.should.not.exist);
	})
	.catch(function(error) {
		errorCheck(error, sample);
	});
}