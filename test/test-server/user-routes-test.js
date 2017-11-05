const express = require('express'),
	nock = require('nock'),
	config = require('../../server/config.js'),
	userRoutes = require('../../server/user-routes.js'),
	{ chai, chaiHTTP, should, expect, mongoose, dbTestConnection } = require('../common.js'),
  User = require('../../models/user_model.js'),
  { createData, readData, updateData, deleteData } = require('../../server/programFunctions/crud_functions.js'),
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)',
  { runServer, app } = require('../../server/server.js'),
  testCurrentUser = require('../currentUser.js'),
  accessToken = 42;

chai.use(chaiHTTP);
mongoose.Promise = Promise;
    
before(() => {
	return runServer(8081, dbTestConnection);
});

describe('Selects League', () => {
	it('user profile should not exist', () => {
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
	// res.body.should.not.be.empty;
	// res.body.should.have.property('fantasyLeagueId', fantasyLeagueId);
	// res.body.should.have.property('fantasyLeagueName', fantasyLeagueName);
	
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