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
describe('Club Roster', () => {
	before(() => {
		return new Promise((resolve, reject) => {
			mongoose.connect('mongodb://localhost/fantasy-league', err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
	beforeEach(() => {
		return new Promise((resolve, reject) => {
			mongoose.connection.dropDatabase()
			.then(result => resolve(result))
			.catch(err => reject(err))
		});
	});
	afterEach();
	after(done => {
		mongoose.disconnect();
		done();
	});
	describe('Player', () => {
		it('should add player from ref', (done) => {

		});
	});
});