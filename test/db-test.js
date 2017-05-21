const
	// import common modules
	{ mongoose, dbTestConnection } = require('./common.js'),
	// all models
	User = require('../models/user_model.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	FantasyLeague = require('../models/fantasyLeague_model.js'),
	FantasyChampsLeague = require('../models/fantasyChampsLeague_model.js'),
	FantasyMatch = require('../models/fantasyMatch_model.js'),
	FantasySchedule = require('../models/fantasySchedule_model.js'),
	Schedule = require('../models/schedule_model.js'),
	Player = require('../models/player_model.js'),
	// import crud functions
	{ createData, readData, updateData, deleteData } = require('../programFunctions/crud_functions.js');

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
	});
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
	});
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
	});
});

describe('Fantasy Match', () => {
	it('should not exist', () => {
		const sampleFantasyMatch = {
			homeClub: 'another team'
		};
		
		return readData(sampleFantasyMatch, FantasyMatch).should.eventually.not.exist;
	});
	it('should create a new fantasy match', () => {
		const sampleFantasyMatch = {
			homeClub: 'another team'
		};
		
		return createData(sampleFantasyMatch, FantasyMatch).should.eventually.exist;
	});
	it('should update a fantasy match', () => {
		const sampleFantasyMatch = {
			homeClub: 'another team'
		};
		
		return updateData(sampleFantasyMatch, {homeClub: 'a third team'}, FantasyMatch)
		.then(updatedItem => {
			updatedItem.should.have.property('homeClub', 'a third team');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
	it('should remove a fantasy match', () => {
		const sampleFantasyMatch2 = {
			homeClub: 'a third team'
		};
		
		return deleteData(sampleFantasyMatch2, FantasyMatch)
		.then(deletedItem => {
			readData(sampleFantasyMatch2, FantasyMatch)
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
	});
});

describe('Fantasy Schedule', () => {
	it('should not exist', () => {
		const sampleFantasySchedule = {
			masterRegSeasonSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return readData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
	});
	it('should create a new fantasy schedule', () => {
		const sampleFantasySchedule = {
			masterRegSeasonSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return createData(sampleFantasySchedule, FantasySchedule).should.eventually.exist;
	});
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
	});
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
	});
});

describe('Player', () => {
	it('should not exist', () => {
		const samplePlayer = {
			playerPosition: 'Defender'
		};
		
		return readData(samplePlayer, Player).should.eventually.not.exist;
	});
	it('should create a new r/w player', () => {
		const samplePlayer = {
			playerPosition: 'Defender'
		};
		
		return createData(samplePlayer, Player).should.eventually.exist;
	});
	it('should update a r/w player', () => {
		const samplePlayer = {
			playerPosition: 'Defender'
		};
		
		return updateData(samplePlayer, {playerPosition: 'Midfield'}, Player)
		.then(updatedItem => {
			updatedItem.should.have.property('playerPosition', 'Midfield');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
	it('should remove a r/w player', () => {
		const samplePlayer2 = {
			playerPosition: 'Midfield'
		};
		
		return deleteData(samplePlayer2, Player)
		.then(deletedItem => {
			readData(samplePlayer2, Player)
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
	});
});

describe('Schedule', () => {
	it('should not exist', () => {
		const sampleSchedule = {
			masterSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return readData(sampleSchedule, Schedule).should.eventually.not.exist;
	});
	it('should create a new master schedule', () => {
		const sampleSchedule = {
			masterSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return createData(sampleSchedule, Schedule).should.eventually.exist;
	});
	it('should update a master schedule', () => {
		const sampleSchedule = {
			masterSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return updateData(sampleSchedule, {
			masterSchedule: {
				homeClub: 'another team'
			}
		}, Schedule)
		.then(updatedItem => {
			updatedItem.masterSchedule.should.have.property('homeClub', 'another team');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
	it('should remove a master schedule', () => {
		const sampleSchedule2 = {
			masterSchedule: {
				homeClub: 'another team'
			}
		};
		
		return deleteData(sampleSchedule2, Schedule)
		.then(deletedItem => {
			readData(sampleSchedule2, Schedule)
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
	});
});

describe('User', () => {
	it('should not exist', () => {
		const sampleUser = {
			userName: 'user1'
		};
		
		return readData(sampleUser, User).should.eventually.not.exist;
	});
	it('should create a new user', () => {
		const sampleUser = {
			userName: 'user1'
		};
		
		return createData(sampleUser, User).should.eventually.exist;
	});
	it('should update a user', () => {
		const sampleUser = {
			userName: 'user1'
		};
		
		return updateData(sampleUser, {userName: 'user2'}, User)
		.then(updatedItem => {
			updatedItem.should.have.property('userName', 'user2');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
	it('should delete a user', () => {
		const sampleUser2 = {
			userName: 'user2'
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
	});
});

describe('Fantasy League', () => {
	it('should not exist', () => {
		const sampleFantasyLeague = {
			fantasyLeagueName: 'Super Fantasy League'
		};
		
		return readData(sampleFantasyLeague, FantasyLeague).should.eventually.not.exist;
	});
	it('should create a new fantasy league', () => {
		const sampleFantasyLeague = {
			fantasyLeagueName: 'Super Fantasy League'
		};
		
		return createData(sampleFantasyLeague, FantasyLeague).should.eventually.exist;
	});
	it('should update a user', () => {
		const sampleFantasyLeague = {
			fantasyLeagueName: 'Super Fantasy League'
		};
		
		return updateData(sampleFantasyLeague, {fantasyLeagueName: 'Another Fantasy League'}, FantasyLeague)
		.then(updatedItem => {
			updatedItem.should.have.property('fantasyLeagueName', 'Another Fantasy League');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
	it('should remove a fantasy league', () => {
		const sampleFantasyLeague2 = {
			fantasyLeagueName: 'Another Fantasy League'
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
	});
});

describe('Fantasy Club', () => {
	it('should not exist', () => {
		const sampleFantasyClub = {
			fantasyClubName: 'Strikers \'87'
		};
		
		return readData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
	});
	it('should create new fantasy club', () => {
		const sampleFantasyClub = {
			fantasyClubName: 'Strikers \'87'
		};
		
		return createData(sampleFantasyClub, FantasyClub).should.eventually.exist;
	});
	it('should update a fantasy club', () => {
		const sampleFantasyClub = {
			fantasyClubName: 'Strikers \'87'
		};
		
		return updateData(sampleFantasyClub, {fantasyClubName: 'Changed Name'}, FantasyClub)
		.then(updatedItem => {
			updatedItem.should.have.property('fantasyClubName', 'Changed Name');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
	it('should remove a fantasy club', () => {
		const sampleFantasyClub2 = {
			fantasyClubName: 'Changed Name'
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
	});
});