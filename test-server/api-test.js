const { chai, chaiHTTP, should, mongoose, dbTestConnection } = require('./common.js'),
    User = require('../models/user_model.js'),
    { createData, readData, updateData, deleteData } = require('../server/programFunctions/crud_functions.js'),
    fantasyLeagueId = 779,
    fantasyLeagueName = 'Major League Soccer (USA)',
    { runServer, app } = require('../server/server.js');

chai.use(chaiHTTP);
mongoose.Promise = Promise;
    
before(() => {
	return runServer(dbTestConnection);
});

describe('Selects League', () => {
	it('should not exist in a user profile', () => {
		const sampleUser = {
			displayName: 'user1',
			accessToken: '42',
			googleId: '1974'
		};
		createData(sampleUser, User)
		.then(() => {
			console.log('hello!23');
			chai.request(app)
			.get('/user/user1')
			.end((err, res) => {
				console.log('hello!');
				if (err) {
					throw new Error(err);
				}
				else {
					console.log(`res: ${res}`);
				}
			});
		});
		chai.request(app)
			.put('/user/addLeague')
			.send({ fantasyLeagueId, fantasyLeagueName })
			.end((err, res) => {
				
			});
	});
	
	it('should add league id and name to a user profile', () => {
		
	});
});