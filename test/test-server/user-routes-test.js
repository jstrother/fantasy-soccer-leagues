const chai = require('chai'),
	chaiHTTP = require('chai-http'),
	should = chai.should(),
	expect = chai.expect,
	userRouter = require('../../server/user-routes.js').userRouter,
	{ mongoose, dbTestConnection, testCurrentUser, fantasyLeagueId, fantasyLeagueName } = require('../common.js'),
  User = require('../../models/user_model.js'),
  { closeServer, runServer, app } = require('../../server/server.js');

chai.use(chaiHTTP);
mongoose.Promise = Promise;
    
before(() => {
	runServer(8081, dbTestConnection);
});

after(done => {
	mongoose.connection.db.dropDatabase(done);
	closeServer();
});

describe('User Profile', () => {
	it('should not exist', () => {
		const nonExistantCurrentUser = testCurrentUser;
		
		return User.findOne(nonExistantCurrentUser).should.eventually.not.exist;
	});
	
	it('should create a user profile', () => {
		const createCurrentUser = testCurrentUser;
		
		return User.create(createCurrentUser).should.eventually.exist;
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
			return User.findOne(updateCurrentUser)
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
		
		return User.findOneAndRemove(deleteCurrentUser)
		.then(deletedItem => {
			User.findOne(deleteCurrentUser)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			});
		});
	});
});