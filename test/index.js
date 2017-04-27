const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	should = chai.should(),
	Club = require('../models/club_model.js'),
	sampleClub = require('../sample-club.js'),
	Player = require('../models/player_model.js'),
	samplePlayer = require('../sample-player.js'),
	{read} = require('../snippets/snippets.js');

mongoose.Promise = global.Promise;
console.log('Hello!');
describe('Club Roster', function() {
	before(function(done) {
		mongoose.createConnection('mongodb://localhost/fantasy-league-test');
		done();
	});
	beforeEach(function(done) {
		mongoose.connection.db.dropDatabase();
		done();
	});
	// afterEach();
	after(done => {
		mongoose.disconnect();
		done();
	});
	describe('Player', () => {
		it('should add player from ref', (done) => {
			done();
		});
	});
});