const express = require('express'),
	config = require('../../server/config.js'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
  userRouter = express.Router(),
	{ chai, chaiHTTP, should, expect, mongoose, dbTestConnection } = require('../common.js'),
  User = require('../../models/user_model.js'),
  { createData, readData, updateData, deleteData } = require('../../server/programFunctions/crud_functions.js'),
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)',
  { runServer, app } = require('../../server/server.js'),
  accessToken = 42;

chai.use(chaiHTTP);
mongoose.Promise = Promise;
    
before(() => {
	return runServer(8081, dbTestConnection);
});

describe('Selects League', () => {
	it('fantasyLeagueId and fantasyLeagueName should not exist in a user profile', () => {
		const sampleUser = {
			displayName: 'user1',
			accessToken,
			googleId: '1974',
			givenName: 'Test',
			familyName: 'User'
		};
		return createData(sampleUser, User)
		.then(() => {
			console.log('hello');
			chai.request(app)
			.get('/user/user1')
			.set({'Authorization': `Bearer ${accessToken}`})
			.then(res => {
				console.log('res.body:', res.body);
				console.log('res.body keys:', Object.keys(res.body));
				expect(res.body).to.not.be.empty;
				expect(res.body).to.have.property('fantasyLeagueId', fantasyLeagueId);
				expect(res.body).to.have.property('fantasyLeagueName', fantasyLeagueName);
			})
			.catch(err => {
				throw new Error(err);
			});
		});
	});
	
	it('should add league id and name to a user profile', () => {
		// chai.request(app)
		// 	.put('/user/addLeague')
		// 	.send({ fantasyLeagueId, fantasyLeagueName })
		// 	.end((err, res) => {
		// 		if (err) {
		// 			throw new Error(err);
		// 		}
				
		// 	});
	});
});