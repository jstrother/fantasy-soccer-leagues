const { chai, chaiHTTP, should, mongoose, dbTestConnection } = require('./common.js'),
    User = require('../models/user_model.js'),
    { createData, readData, updateData, deleteData } = require('../server/programFunctions/crud_functions.js'),
    fantasyLeagueId = 779,
    fantasyLeagueName = 'Major League Soccer (USA)',
    { runServer, app } = require('../server/server.js'),
    accessToken = 42;

chai.use(chaiHTTP);
mongoose.Promise = Promise;
    
before(() => {
	return runServer(dbTestConnection);
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
			chai.request(app)
			.get('/user/user1')
			.set({'Authorization': `Bearer ${accessToken}`})
			.end((err, res) => {
				if (err) {
					throw new Error(err);
				}
				// console.log(`res: ${res.body}`);
				console.log(Object.keys(res.body));
				res.body.should.be.an('object').that.has.keys('fantasyLeagueId', 'fantasyLeagueName');
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