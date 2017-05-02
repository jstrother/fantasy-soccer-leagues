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