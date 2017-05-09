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
	samplePlayer = require('../samples/sample-player.js'),
	// import crud functions
	{ createData, readData, updateData, deleteData } = require('../crud_functions.js');

mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);

console.log('Run Date/Time', Date.now());

describe('Fantasy Game', () => {
	before(done => {
		mongoose.connect('mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-test');
		mongoose.connection.on('connected', () => {
			console.log('connection made');
			mongoose.connection.db.dropDatabase();
			done();
		});
	});

	after(done => {
		mongoose.disconnect();
		mongoose.connection.on('disconnected', () => {
			console.log('disconnected');
			mongoose.connection.db.dropDatabase();
		});
		done();
	});

	describe('Champions League', () => {
		it('should not exist', () => {
			return readData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.not.exist;
		});
		it('should create a new champions league', () => {
			return createData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.exist;
		});
		// it('should update a champions league', () => {
		// 	return updateData(sampleFantasyChampsLeague, 'fantasyChampsLeagueName', 'Champions 2', FantasyChampsLeague).should.eventually.equal('Champions 2');
		// });
		// it('should remove a champions league', function() {
		// 	return deleteData(sampleFantasyChampsLeague, FantasyGame).should.eventually.not.exist;
		// });
	});

	describe('Fantasy Match', () => {
		it('should not exist', () => {
			return readData(sampleFantasyMatch, FantasyMatch).should.eventually.not.exist;
		});
		it('should create a new fantasy match', () => {
			return createData(sampleFantasyMatch, FantasyMatch).should.eventually.exist;
		});
		// it('should update a fantasy match', function() {
		// 	return updateExisting(sampleFantasyMatch, 'homeClub', 'a third team', FantasyMatch);
		// });
		// it('should remove a fantasy match', function() {
		// 	return deleteData(sampleFantasyMatch, FantasyMatch).should.eventually.not.exist;
		// });
	});

	describe('Fantasy Schedule', () => {
		it('should not exist', () => {
			return readData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
		});
		it('should create a new fantasy schedule', () => {
			return createData(sampleFantasySchedule, FantasySchedule).should.eventually.exist;
		});
		// it('should update a fantasy schedule', function(done) {
		// 	updateExisting(sampleFantasySchedule, 'masterRegSeasonSchedule', 'a third team @ fantasy team', FantasySchedule);
		// 	done();
		// });
		// it('should remove a fantasy schedule', function() {
		// 	return deleteData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
		// });
	});

	describe('Player', () => {
		it('should not exist', () => {
			return readData(samplePlayer, Player).should.eventually.not.exist;
		});
		it('should create a new r/w player', () => {
			return createData(samplePlayer, Player).should.eventually.exist;
		});
		// it('should update a r/w player', function(done) {
		// 	updateExisting(samplePlayer, 'playerPosition', 'Defender', Player);
		// 	done();
		// });
		// it('should remove a r/w player', function() {
		// 	return deleteData(samplePlayer, Player).should.eventually.not.exist;
		// });
	});

	describe('Schedule', () => {
		it('should not exist', () => {
			return readData(sampleSchedule, Schedule).should.eventually.not.exist;
		});
		it('should create a new master schedule', () => {
			return createData(sampleSchedule, Schedule).should.eventually.exist;
		});
		// it('should update a master schedule', function(done) {
		// 	updateExisting(sampleSchedule, 'masterSchedule', 'Vancouver Whitecaps FC @ Seattle Sounders FC', Schedule);
		// 	done();
		// });
		// it('should remove a master schedule', function() {
		// 	return deleteData(sampleSchedule, Schedule).should.eventually.not.exist;
		// });
	});

	describe('User', () => {
		it('should not exist', () => {
			return readData(sampleUser, User).should.eventually.not.exist;
		});
		it('should create a new user', () => {
			return createData(sampleUser, User).should.eventually.exist;
		});
		// it('should update a user', function(done) {
		// 	updateExisting(sampleUser, 'userName', 'user2', User);
		// 	done();
		// });
		// it('should delete a user', function() {
		// 	return deleteData(sampleUser, User).should.eventually.not.exist;
		// });
	});

	describe('Fantasy League', () => {
		it('should not exist', () => {
			return readData(sampleFantasyLeague, FantasyLeague).should.eventually.not.exist;
		});
		it('should create a new fantasy league', () => {
			return createData(sampleFantasyLeague, FantasyLeague).should.eventually.exist;
		});
		// it('should update a fantasy league', function(done) {
		// 	updateExisting(sampleFantasyLeague, 'fantasyLeagueName', 'Another Fantasy League', FantasyLeague);
		// 	done();
		// });
		// it('should remove a fantasy league', function() {
		// 	return deleteData(sampleFantasyLeague, FantasyLeague).should.eventually.not.exist;
		// });
	});

	describe('Fantasy Club', () => {
		it('should not exist', () => {
			return readData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
		});
		it('should create new fantasy club', () => {
			return createData(sampleFantasyClub, FantasyClub).should.eventually.exist;
		});
		// it('should update a fantasy club', function(done) {
		// 	updateExisting(sampleFantasyClub, 'fantasyClubDivision', 'Division 2', FantasyClub);
		// 	done();
		// });
		// it('should remove a fantasy club', function() {
		// 	return deleteData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
		// });
	});
});