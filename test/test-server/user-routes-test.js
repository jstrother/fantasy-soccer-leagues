const express = require('express'),
	nock = require('nock'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	should = chai.should(),
	expect = chai.expect,
	config = require('../../server/config.js'),
	userRoutes = require('../../server/user-routes.js'),
	{ mongoose, dbTestConnection } = require('../common.js'),
  User = require('../../models/user_model.js'),
  { createData, readData, updateData, deleteData } = require('../../server/programFunctions/crud_functions.js'),
  { runServer, app } = require('../../server/server.js'),
  testCurrentUser = {
  	accessToken: 1974,
	  displayName: 'Clint Dempsey',
	  givenName: 'Clint',
	  familyName: 'Dempsey',
	  userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
	  googleId: 2
  },
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)';

chai.use(chaiHTTP);
mongoose.Promise = Promise;
    
before(() => {
	runServer(8081, dbTestConnection);
});

describe('User Profile', () => {
	it('should not exist', () => {
		const nonExistantCurrentUser = testCurrentUser;
		
		return readData(nonExistantCurrentUser, User).should.eventually.not.exist;
	});
	
	it('should create a user profile', () => {
		const createCurrentUser = testCurrentUser;
		
		return createData(createCurrentUser, User).should.eventually.exist;
	});
	
	it('should update a user profile', () => {
		const updateCurrentUser = testCurrentUser;
		
		return updateData(updateCurrentUser, { fantasyLeagueId, fantasyLeagueName }, User)
		.then(updatedItem => {
			updatedItem.should.have.property('fantasyLeagueId', fantasyLeagueId);
			updatedItem.should.have.property('fantasyLeagueName', fantasyLeagueName);
		});
	});
	
	it('should remove a user profile', () => {
		const deleteCurrentUser = {
			accessToken: testCurrentUser.accessToken,
			googleId: testCurrentUser.googleId,
			displayName: testCurrentUser.displayName,
			givenName: testCurrentUser.givenName,
			familyName: testCurrentUser.familyName,
			userPhoto: testCurrentUser.userPhoto,
			fantasyLeagueId,
			fantasyLeagueName
		};
		
		return deleteData(deleteCurrentUser, User)
		.then(deletedItem => {
			readData(deleteCurrentUser, User)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			});
		});
	});
});

// .then(() => {
			// 	console.log('hello');
			// 	chai.request(app)
			// 	.get('/user/user1')
			// 	.set({'Authorization': `Bearer ${accessToken}`})
			// 	.then(res => {
			// 		// console.log('res:', res);
			// 		console.log('res.body:', res.body);
			// 		console.log('res.body keys:', Object.keys(res.body));
			// 		true.should.equal(false);
			// 		res.should.be.empty;
			// 		res.should.have.property('fantasyLeagueId', fantasyLeagueId);
			// 		res.should.have.property('fantasyLeagueName', fantasyLeagueName);
			// 	})
			// 	.catch(err => {
			// 		throw new Error(err);
			// 	});
			// });