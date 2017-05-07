const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require('chai-as-promised'),
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
chai.use(chaiAsPromised);

console.log('Run Date/Time', Date.now());

describe('Fantasy Game', function() {
	before(function(done) {
		mongoose.connection.on('connected', function() {
			console.log('connection made');
			mongoose.connection.db.dropDatabase();
			done();
		});
		mongoose.connect('mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-test');
	});

	after(function(done) {
		mongoose.disconnect();
		mongoose.connection.on('disconnected', function() {
			console.log('disconnected');
		});
		done();
	});

	describe('Champions League', function() {
		it('should not exist', function() {
			return getModel(sampleFantasyChampsLeague, FantasyGame).should.eventually.equal(null);
		});
		// it('should create a new champions league', function() {
		// 	return createNew(sampleFantasyChampsLeague, FantasyGame).should.eventually.exist;
		// });
		// it('should update a champions league', function() {
		// 	return updateExisting(sampleFantasyChampsLeague, 'fantasyChampsLeagueName', 'Champions 2', FantasyGame);
		// });
		// it('should remove a champions league', function(done) {
		// 	deleteExisting(sampleFantasyChampsLeague, FantasyGame);
		// 	done();
		// });
	});

	describe('Fantasy Match', function() {
		it('should not exist', function() {
			return getModel(sampleFantasyMatch, FantasyGame).should.eventually.equal(null);
		});
		// it('should create a new fantasy match', function() {
		// 	return createNew(sampleFantasyMatch, FantasyGame).should.eventually.exist;
		// });
		// it('should update a fantasy match', function(done) {
		// 	updateExisting(sampleFantasyMatch, 'homeClub', 'a third team', FantasyGame);
		// 	done();
		// });
		// it('should remove a fantasy match', function(done) {
		// 	deleteExisting(sampleFantasyMatch, FantasyGame);
		// 	done();
		// });
	});

	describe('Fantasy Schedule', function() {
		it('should not exist', function() {
			return getModel(sampleFantasySchedule, FantasyGame).should.eventually.equal(null);
		});
		// it('should create a new fantasy schedule', function() {
		// 	return createNew(sampleFantasySchedule, FantasyGame).should.eventually.exist;
		// });
		// it('should update a fantasy schedule', function(done) {
		// 	updateExisting(sampleFantasySchedule, 'masterRegSeasonSchedule', 'a third team @ fantasy team', FantasyGame);
		// 	done();
		// });
		// it('should remove a fantasy schedule', function(done) {
		// 	deleteExisting(sampleFantasySchedule, FantasyGame);
		// 	done();
		// });
	});

	describe('Player', function() {
		it('should not exist', function() {
			return getModel(samplePlayer, FantasyGame).should.eventually.equal(null);
		});
		// it('should create a new r/w player', function() {
		// 	return createNew(samplePlayer, FantasyGame).should.eventually.exist;
		// });
		// it('should update a r/w player', function(done) {
		// 	updateExisting(samplePlayer, 'playerPosition', 'Defender', FantasyGame);
		// 	done();
		// });
		// it('should remove a r/w player', function(done) {
		// 	deleteExisting(samplePlayer, FantasyGame);
		// 	done();
		// });
	});

	describe('Schedule', function() {
		it('should not exist', function() {
			return getModel(sampleSchedule, FantasyGame).should.eventually.equal(null);
		});
		// it('should create a new master schedule', function() {
		// 	return createNew(sampleSchedule, FantasyGame).should.eventually.exist;
		// });
		// it('should update a master schedule', function(done) {
		// 	updateExisting(sampleSchedule, 'masterSchedule', 'Vancouver Whitecaps FC @ Seattle Sounders FC', FantasyGame);
		// 	done();
		// });
		// it('should remove a master schedule', function(done) {
		// 	deleteExisting(sampleSchedule, FantasyGame);
		// 	done();
		// });
	});

	describe('User', function() {
		it('should not exist', function() {
			return getModel(sampleUser, FantasyGame).should.eventually.equal(null);
		});
		// it('should create a new user', function() {
		// 	return createNew(sampleUser, FantasyGame).should.eventually.exist;
		// });
		// it('should update a user', function(done) {
		// 	updateExisting(sampleUser, 'userName', 'user2', FantasyGame);
		// 	done();
		// });
		// it('should delete a user', function(done) {
		// 	deleteExisting(sampleUser, FantasyGame);
		// 	done();
		// });
	});

	describe('Fantasy League', function() {
		it('should not exist', function() {
			return getModel(sampleFantasyLeague, FantasyGame).should.eventually.equal(null);
		});
		// it('should create a new fantasy league', function() {
		// 	return createNew(sampleFantasyLeague, FantasyGame).should.eventually.exist;
		// });
		// it('should update a fantasy league', function(done) {
		// 	updateExisting(sampleFantasyLeague, 'fantasyLeagueName', 'Another Fantasy League', User);
		// 	done();
		// });
		// it('should remove a fantasy league', function(done) {
		// 	deleteExisting(sampleFantasyLeague, User);
		// 	done();
		// });
	});

	describe('Fantasy Club', function() {
		it('should not exist', function() {
			return getModel(sampleFantasyClub, FantasyGame).should.eventually.equal(null);
		});
		// it('should create new fantasy club', function() {
		// 	return createNew(sampleFantasyClub, FantasyGame).should.eventually.exist;
		// });
		// it('should update a fantasy club', function(done) {
		// 	updateExisting(sampleFantasyClub, 'fantasyClubDivision', 'Division 2', User);
		// 	done();
		// });
		// it('should remove a fantasy club', function(done) {
		// 	deleteExisting(sampleFantasyClub, User);
		// 	done();
		// });
	});
});

function errorCheck(error, sample) {
 	if (error || !sample) {
 		console.error(`Could not read ${sample}`);
 		console.log(`Error: ${error}`);
 		console.log(`Run Date: ${Date.now()}`);
 	}
 }

function getModel(sample, model) {
	return model.findOne(sample._id).exec()
	.then(function(model) {
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