const
	// import common modules
	{ mongoose, dbTestConnection } = require('./common.js'),
	// all models
	User = require('../models/user_model.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	FantasyLeague = require('../models/fantasyLeague_model.js'),
	FantasyChampsLeague = require('../models/fantasyChampsLeague_model.js'),
	FantasySchedule = require('../models/fantasySchedule_model.js'),
	FantasyMatch = require('../models/fantasyMatch_model.js'),
	// import crud functions
	{ createData, readData, updateData, deleteData } = require('../server/programFunctions/crud_functions.js');

before(done => {
	mongoose.connect(dbTestConnection);
	mongoose.connection.on('connected', () => {
		console.log('connection made to dbTestConnection');
		mongoose.connection.db.dropDatabase();
	});
	done();
});

after(done => {
	mongoose.disconnect();
	mongoose.connection.on('disconnected', () => {
		console.log('disconnected from dbTestConnection');
		mongoose.connection.db.dropDatabase();
	});
	done();
});

describe('Champions League', () => {
	it('should not exist', () => {
		const sampleFantasyChampsLeague = {
			fantasyChampsLeagueName: 'Champions 1'
		};
		
		return readData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new champions league', () => {
		const sampleFantasyChampsLeague = {
			name: 'Champions 1'
		};
		
		return createData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.exist;
	}).timeout(5000);
	it('should update a champions league', () => {
		const sampleFantasyChampsLeague = {
			name: 'Champions 1'
		};
		
		return updateData(sampleFantasyChampsLeague, {name: 'Champions 2'}, FantasyChampsLeague)
		.then(updatedItem => {
			updatedItem.should.have.property('name', 'Champions 2');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a champions league', () => {
		const sampleFantasyChampsLeague = {
			name: 'Champions 2'
		};
		
		return deleteData(sampleFantasyChampsLeague, FantasyChampsLeague)
		.then(deletedItem => {
			readData(sampleFantasyChampsLeague, FantasyChampsLeague)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Fantasy Schedule', () => {
	it('should not exist', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 100
		};
		
		return readData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new fantasy schedule', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 100
		};
		
		return createData(sampleFantasySchedule, FantasySchedule).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy schedule', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 100
		};
		
		return updateData(sampleFantasySchedule, {
			numLeagueSeasonMatches: 101
		}, FantasySchedule)
		.then(updatedItem => {
			updatedItem.masterRegSeasonSchedule.should.have.property('numLeagueSeasonMatches', 101);
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a fantasy schedule', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 101
		};
		
		return deleteData(sampleFantasySchedule, FantasySchedule)
		.then(deletedItem => {
			readData(sampleFantasySchedule, FantasySchedule)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('User', () => {
	it('should not exist', () => {
		const sampleUser = {
			displayName: 'user1',
			accessToken: '42',
			googleId: '1974'
		};
		
		return readData(sampleUser, User).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new user', () => {
		const sampleUser = {
			displayName: 'user1',
			accessToken: '42',
			googleId: '1974'
		};
		
		return createData(sampleUser, User).should.eventually.exist;
	}).timeout(5000);
	it('should update a user', () => {
		const sampleUser = {
			displayName: 'user1',
			accessToken: '42',
			googleId: '1974'
		};
		
		return updateData(sampleUser, {displayName: 'user2'}, User)
		.then(updatedItem => {
			updatedItem.should.have.property('displayName', 'user2');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should delete a user', () => {
		const sampleUser2 = {
			displayName: 'user2',
			accessToken: '42',
			googleId: '1974'
		};
		
		return deleteData(sampleUser2, User)
		.then(deletedItem => {
			readData(sampleUser2, User)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Fantasy League', () => {
	it('should not exist', () => {
		const sampleFantasyLeague = {
			Name: 'Super Fantasy League'
		};
		
		return readData(sampleFantasyLeague, FantasyLeague).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new fantasy league', () => {
		const sampleFantasyLeague = {
			Name: 'Super Fantasy League'
		};
		
		return createData(sampleFantasyLeague, FantasyLeague).should.eventually.exist;
	}).timeout(5000);
	it('should update a user', () => {
		const sampleFantasyLeague = {
			Name: 'Super Fantasy League'
		};
		
		return updateData(sampleFantasyLeague, {Name: 'Another Fantasy League'}, FantasyLeague)
		.then(updatedItem => {
			updatedItem.should.have.property('Name', 'Another Fantasy League');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a fantasy league', () => {
		const sampleFantasyLeague2 = {
			Name: 'Another Fantasy League'
		};
		
		return deleteData(sampleFantasyLeague2, FantasyLeague)
		.then(deletedItem => {
			readData(sampleFantasyLeague2, FantasyLeague)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Fantasy Club', () => {
	it('should not exist', () => {
		const sampleFantasyClub = {
			name: 'Team Name',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		return readData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
	}).timeout(5000);
	it('should create new fantasy club', () => {
		const sampleFantasyClub = {
			name: 'Team Name',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		return createData(sampleFantasyClub, FantasyClub).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy club', () => {
		const sampleFantasyClub = {
			name: 'Team Name',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		return updateData(sampleFantasyClub, {division: 'Test Division 2'}, FantasyClub)
		.then(updatedItem => {
			updatedItem.should.have.property('division', 'Test Division 2');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a fantasy club', () => {
		const sampleFantasyClub = {
			name: 'Team Name',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 2'
		};
		
		return deleteData(sampleFantasyClub, FantasyClub)
		.then(deletedItem => {
			readData(sampleFantasyClub, FantasyClub)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Fantasy Match', () => {
	it('should not exist', () => {
		const homeClub = {
			name: 'Home',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		const awayClub = {
			name: 'Away',
			manager: 'Boss',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		const sampleFantasyMatch = {
			matchType: 'Regular Season',
			homeClub,
			homeScore: 0,
			awayClub,
			awayScore: 0
		};
		
		return readData(sampleFantasyMatch, FantasyMatch).should.eventually.not.exist;
	}).timeout(5000);
	it('should create new fantasy match', () => {
		const homeClub = {
			name: 'Home',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		createData(homeClub, FantasyClub)
		.then((homeClub) => {
			
		});
		
		const awayClub = {
			name: 'Away',
			manager: 'Boss',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		createData(awayClub, FantasyClub);
		
		const sampleFantasyMatch = {
			matchType: 'Regular Season',
			homeClub,
			homeScore: 0,
			awayClub,
			awayScore: 0
		};
		
		return createData(sampleFantasyMatch, FantasyMatch).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy match', () => {
		const homeClub = {
			name: 'Home',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		const awayClub = {
			name: 'Away',
			manager: 'Boss',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		const sampleFantasyMatch = {
			matchType: 'Regular Season',
			homeClub,
			homeScore: 0,
			awayClub,
			awayScore: 0
		};
		
		return updateData(sampleFantasyMatch, {homeScore: 2, awayScore: 1}, FantasyMatch)
		.then(updatedItem => {
			updatedItem.should.have.property('homeScore', 2);
			updatedItem.should.have.property('awayScore', 1);
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a fantasy match', () => {
		const homeClub = {
			name: 'Home',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		const awayClub = {
			name: 'Away',
			manager: 'Boss',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		const sampleFantasyMatch = {
			matchType: 'Regular Season',
			homeClub,
			homeScore: 2,
			awayClub,
			awayScore: 1
		};
		
		return deleteData(sampleFantasyMatch, FantasyMatch)
		.then(deletedItem => {
			readData(sampleFantasyMatch, FantasyMatch)
			.then(deletedItem => {
				deletedItem.should.not.exist;
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});