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
console.log('Run Date/Time', Date.now());
describe('Club Roster', () => {
	before(done => {
		mongoose.createConnection('mongodb://localhost/fantasy-league-test');
		done();
	});
	beforeEach(done => {

		done();
	});
	afterEach(done => {
		mongoose.connection.db.dropDatabase();
		done();
	});
	after(done => {
		mongoose.disconnect();
		done();
	});
	describe('Player', () => {
		it('should not exist', done => {
			Club.findOne(samplePlayer._id, (err, playerQuery) => {
		    if (err || !playerQuery) {
		      console.error(`Could not read: ${playerQuery}`);
		      console.log(`Error: ${err}`);
		      console.log(`Date: ${Date.now()}`);
		      return;
		    }
		    playerQuery.should.not.exist;
		    console.log(`Read ${playerQuery}`);
		  });
			done();
		});
		it('should add to club roster from ref', done => {
			Club.findOne(samplePlayer._id, sampleClub._id, (err, playerQuery, clubQuery) => {
				if (err || !playerQuery && !clubQuery) {
					console.error(`Could not read: ${playerQuery} and/or ${clubQuery}`);
					console.log(`Error: ${err}`);
					console.log(`Date: ${Date.now()}`);
					return;
				}
				else if (playerQuery.playerClub === clubQuery.clubName) {
					console.log('true');
					clubQuery.clubRoster.push(playerQuery._id);
					console.log(`Roster ${clubQuery.clubRoster}`);
				}
			});
			done();
		});
		it('should now exist', done => {
			Club.findOne(samplePlayer._id, (err, playerQuery) => {
				if (err || !playerQuery) {
					console.error(`Could not read: ${playerQuery}`);
					console.log(`Error: ${err}`);
					console.log(`Date: ${Date.now()}`);
					return;
				}
				playerQuery.should.exist;
				console.log(`Read ${playerQuery}`);
			});
			done();
		});
	});
});