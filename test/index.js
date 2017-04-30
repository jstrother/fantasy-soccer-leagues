const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	should = chai.should(),
	User = require('../models/user_model.js'),
	sampleUser = require('../sample-user.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	sampleFantasyClub = require('../sample-fantasy-club.js'),
	// import CRUD functions
	{create, read, update, del} = require('../crud_functions.js');

mongoose.Promise = global.Promise;

console.log('Run Date/Time', Date.now());

describe('User', function() {
	before(function(done) {
		console.log('before hook', mongoose.createConnection('mongodb://jim.strother:password@ds161169.mlab.com:61169/fantasy-soccer-test').then);
		done();
	});
	beforeEach(function(done) {
		console.log(mongoose.connection.dropDatabase);
		mongoose.connection.dropDatabase()
			.then(done, done);
		done();
	});
	afterEach(function(done) {
		
		done();
	});
	after(function(done) {
		mongoose.disconnect();
		done();
	});
	describe('Fantasy Club', function() {
		it('should not exist', function(done) {
			User.findOne(sampleFantasyClub._id, function(err, fantasyClubQuery) {
				errorCheck(err, fantasyClubQuery);
				fantasyClubQuery.should.not.exist;
				console.log(`Successfully read ${fantasyClubQuery}`);
			});
			done();
		});
	// 	it('should create new fantasy club', function(done) {
	// 		User.create(FantasyClub, sampleFantasyClub);
	// 		done();
	// 	});
	// 	it('should now exist', function(done) {

	// 		done();
	// 	});
	// });
	// describe('Fantasy League', function() {
	// 	it('should not exist', function(done) {

	// 		done();
	// 	});
	// 	it('should create a new fantasy league', function(done) {

	// 		done();
	// 	});
	// 	it('should now exist', function(done) {

	// 		done();
	// 	});
	});
});

function errorCheck(error, query) {
	if (error || !query) {
		console.error(`Could not read ${query}`);
		console.log(`Error: ${error}`);
		console.log(`Run Date: ${Date.now()}`);
	}
}