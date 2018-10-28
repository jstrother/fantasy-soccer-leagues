const userRouter = require('../../server/user-routes.js').userRouter,
	{ mongoose, chai, chaiHTTP, should, fantasyLeagueId, fantasyLeagueName } = require('../common.js'),
  User = require('../../models/user_model.js'),
  { app } = require('../../server/server.js');

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('User Profile', () => {
	it('should create a user profile', () => {
		return User
		.find()
		.then(users => {
			users[0].should.exist;
			users[1].should.exist;
			users[2].should.exist;
		});
	});
	
	it('should update a user profile', () => {
		return User
		.find()
		.then(users => {
			return chai.request(app)
			.put(`/user/selectLeague`)
			.set({'Authorization': `Bearer ${users[0].accessToken}`})
			.send({
				fantasyLeagueId,
				fantasyLeagueName
			})
			.then(res => {
				should.exist(res);
				res.body.should.not.be.empty;
				res.body.should.have.property('fantasyLeagueId', fantasyLeagueId);
				res.body.should.have.property('fantasyLeagueName', fantasyLeagueName);
				return User.findOne(users[0])
				.then(user => {
					should.exist(user);
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
	});
});