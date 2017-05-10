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
	sampleSchedule = require('../samples/sample-schedule.js'),
	samplePlayer = require('../samples/sample-player.js'),
	// import crud functions
	{ createData, readData, updateData, deleteData } = require('../crud_functions.js');

mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);

console.log('Run Date/Time', Date.now());

describe('Fantasy Game', function() {
	this.timeout(3000);
	before(done => {
		mongoose.connect('mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-test');
		mongoose.connection.on('connected', function() {
			console.log('connection made');
			mongoose.connection.db.dropDatabase();
			done();
		});
	});

	after(done => {
		mongoose.disconnect();
		mongoose.connection.on('disconnected', function() {
			console.log('disconnected');
			mongoose.connection.db.dropDatabase();
		});
		done();
	});

	describe('Champions League', function() {
		it('should not exist', function() {
			return readData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.not.exist;
		});
		it('should create a new champions league', function() {
			return createData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.exist;
		});
		it('should update a champions league', function() {
			return updateData(sampleFantasyChampsLeague, {fantasyChampsLeagueName: 'Champions 2'}, FantasyChampsLeague)
			.then(function(updatedItem) {
				updatedItem.should.have.property('fantasyChampsLeagueName', 'Champions 2');
			});
		});
		it('should remove a champions league', function() {
			return deleteData(sampleFantasyChampsLeague, FantasyGame).should.eventually.not.exist;
		});
	});

	describe('Fantasy Match', function() {
		it('should not exist', function() {
			return readData(sampleFantasyMatch, FantasyMatch).should.eventually.not.exist;
		});
		it('should create a new fantasy match', function() {
			return createData(sampleFantasyMatch, FantasyMatch).should.eventually.exist;
		});
		it('should update a fantasy match', function() {
			return updateData(sampleFantasyMatch, {homeClub: 'a third team'}, FantasyMatch)
			.then(function(updatedItem) {
				updatedItem.should.have.property('homeClub', 'a third team');
			});
		});
		it('should remove a fantasy match', function() {
			return deleteData(sampleFantasyMatch, FantasyMatch).should.eventually.not.exist;
		});
	});

	describe('Fantasy Schedule', function() {
		it('should not exist', function() {
			return readData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
		});
		it('should create a new fantasy schedule', function() {
			return createData(sampleFantasySchedule, FantasySchedule).should.eventually.exist;
		});
		it('should update a fantasy schedule', function() {
			return updateData(sampleFantasySchedule, {champsGroupStage: true}, FantasySchedule)
			.then(function(updatedItem) {
				updatedItem.should.have.property('champsGroupStage', true);
			});
		});
		// it('should remove a fantasy schedule', function() {
		// 	return deleteData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
		// });
	});

	describe('Player', function() {
		it('should not exist', function() {
			return readData(samplePlayer, Player).should.eventually.not.exist;
		});
		it('should create a new r/w player', function() {
			return createData(samplePlayer, Player).should.eventually.exist;
		});
		it('should update a r/w player', function() {
			return updateData(samplePlayer, {playerPosition: 'Defender'}, Player)
			.then(function(updatedItem) {
				updatedItem.should.have.property('playerPosition', 'Defender');
			});
		});
		// it('should remove a r/w player', function() {
		// 	return deleteData(samplePlayer, Player).should.eventually.not.exist;
		// });
	});

	describe('Schedule', function() {
		it('should not exist', function() {
			return readData(sampleSchedule, Schedule).should.eventually.not.exist;
		});
		it('should create a new master schedule', function() {
			return createData(sampleSchedule, Schedule).should.eventually.exist;
		});
		it('should update a master schedule', function() {
			return updateData(sampleSchedule, {numSeasonMatches: 375}, Schedule)
			.then(function(updatedItem) {
				updatedItem.should.have.property('numSeasonMatches', 375);
			});
		});
		// it('should remove a master schedule', function() {
		// 	return deleteData(sampleSchedule, Schedule).should.eventually.not.exist;
		// });
	});

	describe('User', function() {
		it('should not exist', function() {
			return readData(sampleUser, User).should.eventually.not.exist;
		});
		it('should create a new user', function() {
			return createData(sampleUser, User).should.eventually.exist;
		});
		it('should update a user', function() {
			return updateData(sampleUser, {userName: 'user2'}, User)
			.then(function(updatedItem) {
				updatedItem.should.have.property('userName', 'user2');
			});
		});
		// it('should delete a user', function() {
		// 	return deleteData(sampleUser, User).should.eventually.not.exist;
		// });
	});

	describe('Fantasy League', function() {
		it('should not exist', function() {
			return readData(sampleFantasyLeague, FantasyLeague).should.eventually.not.exist;
		});
		it('should create a new fantasy league', function() {
			return createData(sampleFantasyLeague, FantasyLeague).should.eventually.exist;
		});
		it('should update a user', function() {
			return updateData(sampleFantasyLeague, {fantasyLeagueName: 'Another Fantasy League'}, FantasyLeague)
			.then(function(updatedItem) {
				updatedItem.should.have.property('fantasyLeagueName', 'Another Fantasy League');
			});
		});
		// it('should remove a fantasy league', function() {
		// 	return deleteData(sampleFantasyLeague, FantasyLeague).should.eventually.not.exist;
		// });
	});

	describe('Fantasy Club', function() {
		it('should not exist', function() {
			return readData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
		});
		it('should create new fantasy club', function() {
			return createData(sampleFantasyClub, FantasyClub).should.eventually.exist;
		});
		it('should update a fantasy club', function() {
			return updateData(sampleFantasyClub, {fantasyClubDivision: 'Division 2'}, FantasyClub)
			.then(function(updatedItem) {
				updatedItem.should.have.property('fantasyClubDivision', 'Division 2');
			});
		});
		// it('should remove a fantasy club', function() {
		// 	return deleteData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
		// });
	});
});