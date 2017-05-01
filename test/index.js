const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	should = chai.should(),
	User = require('../models/user_model.js'),
	sampleUser = require('../sample-user.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	sampleFantasyClub = require('../sample-fantasy-club.js'),
	FantasyLeague = require('../models/fantasyLeague_model.js'),
	sampleFantasyLeague = require('../sample-fantasy-league.js');

mongoose.Promise = global.Promise;

console.log('Run Date/Time', Date.now());

describe('User', function() {
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
// trying to write tests as promises
	function createClub(fantasyClubQuery, User) {
		User.findOne(sampleFantasyClub._id).exec()
			.catch(function(error) {
				errorCheck(error, fantasyClubQuery);
			});
	}

	describe('Fantasy Club', function() {
		it('should not exist', function(done) {
			createClub(sampleFantasyClub, User);
			fantasyClubQuery.should.not.exist;
			done();
		});
		it('should create new fantasy club', function(done) {
			User.create(sampleFantasyClub, function(err, fantasyClubQuery) {
				errorCheck(err, fantasyClubQuery);
				fantasyClubQuery.should.exist;
			});
			done();
		});
		it('should update a fantasy club', function(done) {
			User.findOneAndUpdate(sampleFantasyClub._id, {fantasyClubDivision: 'Division 2'}, function(err, fantasyClubQuery) {
				errorCheck(err, fantasyClubQuery);
				fantasyClubQuery.fantasyClubDivision.should.match('Division 2');
			});
			done();
		});
		it('should remove a fantasy club', function(done) {
			User.findOneAndRemove(sampleFantasyClub._id, function(err, fantasyClubQuery) {
				errorCheck(err, fantasyClubQuery);
				fantasyClubQuery.should.not.exist;
			});
			done();
		});
	});
	describe('Fantasy League', function() {
		it('should not exist', function(done) {
			User.findOne(sampleFantasyLeague._id, function(err, fantasyLeagueQuery) {
				errorCheck(err, fantasyLeagueQuery),
				fantasyLeagueQuery.should.not.exist;
			});
			done();
		});
		it('should create a new fantasy league', function(done) {
			User.create(sampleFantasyLeague, function(err, fantasyLeagueQuery) {
				errorCheck(err, fantasyLeagueQuery);
				fantasyLeagueQuery.should.exist;
			});
			done();
		});
		it('should update a fantasy league', function(done) {
			User.findOneAndUpdate(sampleFantasyLeague._id, {fantasyLeagueName: 'Another Fantasy League'}, function(err, fantasyLeagueQuery) {
				errorCheck(err, fantasyLeagueQuery);
				fantasyLeagueQuery.fantasyClubDivision.should.match('Another Fantasy League');
			});
			done();
		});
		it('should remove a fantasy league', function(done) {
			User.findOneAndRemove(sampleFantasyLeague._id, function(err, fantasyLeagueQuery) {
				errorCheck(err, fantasyLeagueQuery);
				fantasyLeagueQuery.should.not.exist;
			});
			done();
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