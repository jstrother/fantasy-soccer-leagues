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
		
		return chai.request(app)
		.put(`/user/addLeague`)
		.set({'Authorization': `Bearer ${updateCurrentUser.accessToken}`})
		.send({
			fantasyLeagueId,
			fantasyLeagueName
		})
		.then(res => {
			res.body.should.not.be.empty;
			res.body.should.have.property('fantasyLeagueId', fantasyLeagueId);
			res.body.should.have.property('fantasyLeagueName', fantasyLeagueName);
			return readData(updateCurrentUser, User)
			.then(user => {
				user.should.have.property('fantasyLeagueId', fantasyLeagueId);
				user.should.have.property('fantasyLeagueName', fantasyLeagueName);
				return user;
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
		});
	});
	
	it('should remove a user profile', () => {
		const deleteCurrentUser = {
			accessToken: testCurrentUser.accessToken
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