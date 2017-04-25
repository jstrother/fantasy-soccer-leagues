const mongoose = require('mongoose'),
			chai = require('chai'),
			chaiHTTP = require('chai-http'),
			should = chai.should(),
			Club = require('../models/club_model.js'),
			sampleClub = require('../sample-club.js'),
			Player = require('../models/player_model.js'),
			samplePlayer = require('../sample-player.js'),
			read = require('../snippets/snippets.js').read;

mongoose.Promise = global.Promise;

describe('Club Roster', () => {
	it('should add player from ref', (done) => {
		mongoose.connect('mongodb://localhost/fantasy-league-test');
		mongoose.connection.once('open', () => {
			mongoose.dropDatabase()
				.then((first) => {
					console.log('first', first);
					mongoose.disconnect();
					done();
				});
		});
	});
});