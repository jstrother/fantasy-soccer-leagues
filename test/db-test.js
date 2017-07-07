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
			fantasyChampsLeagueName: 'Champions 1'
		};
		
		return createData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.exist;
	}).timeout(5000);
	it('should update a champions league', () => {
		const sampleFantasyChampsLeague = {
			fantasyChampsLeagueName: 'Champions 1'
		};
		
		return updateData(sampleFantasyChampsLeague, {fantasyChampsLeagueName: 'Champions 2'}, FantasyChampsLeague)
		.then(updatedItem => {
			updatedItem.should.have.property('fantasyChampsLeagueName', 'Champions 2');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a champions league', () => {
		const sampleFantasyChampsLeague2 = {
			fantasyChampsLeagueName: 'Champions 2'
		};
		
		return deleteData(sampleFantasyChampsLeague2, FantasyChampsLeague)
		.then(deletedItem => {
			readData(sampleFantasyChampsLeague2, FantasyChampsLeague)
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
			masterRegSeasonSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return readData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new fantasy schedule', () => {
		const sampleFantasySchedule = {
			masterRegSeasonSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return createData(sampleFantasySchedule, FantasySchedule).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy schedule', () => {
		const sampleFantasySchedule = {
			masterRegSeasonSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return updateData(sampleFantasySchedule, {
			masterRegSeasonSchedule: {
				homeClub: 'another team'
			}
		}, FantasySchedule)
		.then(updatedItem => {
			updatedItem.masterRegSeasonSchedule.should.have.property('homeClub', 'another team');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a fantasy schedule', () => {
		const sampleFantasySchedule2 = {
			masterRegSeasonSchedule: {
				homeClub: 'another team'
			}
		};
		
		return deleteData(sampleFantasySchedule2, FantasySchedule)
		.then(deletedItem => {
			readData(sampleFantasySchedule2, FantasySchedule)
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
			name: 'user1'
		};
		
		return readData(sampleUser, User).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new user', () => {
		const sampleUser = {
			name: 'user1',
			accessToken: '42',
			googleId: '1974'
		};
		
		return createData(sampleUser, User).should.eventually.exist;
	}).timeout(5000);
	it('should update a user', () => {
		const sampleUser = {
			name: 'user1'
		};
		
		return updateData(sampleUser, {name: 'user2'}, User)
		.then(updatedItem => {
			updatedItem.should.have.property('name', 'user2');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should delete a user', () => {
		const sampleUser2 = {
			name: 'user2'
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
			Name: 'Team Name',
			Manager: 'Coach',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
		return readData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
	}).timeout(5000);
	it('should create new fantasy club', () => {
		const sampleFantasyClub = {
			Name: 'Team Name',
			Manager: 'Coach',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
		return createData(sampleFantasyClub, FantasyClub).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy club', () => {
		const sampleFantasyClub = {
			Name: 'Team Name',
			Manager: 'Coach',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
		return updateData(sampleFantasyClub, {Division: 'Test Division 2'}, FantasyClub)
		.then(updatedItem => {
			updatedItem.should.have.property('Division', 'Test Division 2');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a fantasy club', () => {
		const sampleFantasyClub2 = {
			Division: 'Test Division 2'
		};
		
		return deleteData(sampleFantasyClub2, FantasyClub)
		.then(deletedItem => {
			readData(sampleFantasyClub2, FantasyClub)
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
			Name: 'Home',
			Manager: 'Coach',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
		const awayClub = {
			Name: 'Away',
			Manager: 'Boss',
			League: 'Test League',
			Division: 'Test Division 1'
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
			Name: 'Home',
			Manager: 'Coach',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
		const awayClub = {
			Name: 'Away',
			Manager: 'Boss',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
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
			Name: 'Home',
			Manager: 'Coach',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
		const awayClub = {
			Name: 'Away',
			Manager: 'Boss',
			League: 'Test League',
			Division: 'Test Division 1'
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
			Name: 'Home',
			Manager: 'Coach',
			League: 'Test League',
			Division: 'Test Division 1'
		};
		
		const awayClub = {
			Name: 'Away',
			Manager: 'Boss',
			League: 'Test League',
			Division: 'Test Division 1'
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