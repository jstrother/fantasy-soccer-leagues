const
	// all models
	FantasyGame = require('../models/fantasyGame_model.js'),
	User = require('../models/user_model.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	FantasyLeague = require('../models/fantasyLeague_model.js'),
	FantasyChampsLeague = require('../models/fantasyChampsLeague_model.js'),
	FantasyMatch = require('../models/fantasyMatch_model.js'),
	FantasySchedule = require('../models/fantasySchedule_model.js'),
	Schedule = require('../models/schedule_model.js'),
	Player = require('../models/player_model.js'),
	// import crud functions
	{ createData, readData, updateData, deleteData } = require('../crud_functions.js'),
	// import common modules
	{ mongoose, chai, chaiHTTP, chaiAsPromised, should, dbTestConnection } = require('./common.js');

mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);

console.log('Run Date/Time', Date.now());

describe('Champions League', function() {
	it('should not exist', function() {
		const sampleFantasyChampsLeague = {
			fantasyChampsLeagueName: 'Champions 1'
		};
		
		return readData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.not.exist;
	});
	it('should create a new champions league', function() {
		const sampleFantasyChampsLeague = {
			fantasyChampsLeagueName: 'Champions 1'
		};
		
		return createData(sampleFantasyChampsLeague, FantasyChampsLeague).should.eventually.exist;
	});
	it('should update a champions league', function() {
		const sampleFantasyChampsLeague = {
			fantasyChampsLeagueName: 'Champions 1'
		};
		
		return updateData(sampleFantasyChampsLeague, {fantasyChampsLeagueName: 'Champions 2'}, FantasyChampsLeague)
		.then(function(updatedItem) {
			updatedItem.should.have.property('fantasyChampsLeagueName', 'Champions 2');
		});
	});
	it('should remove a champions league', function() {
		const sampleFantasyChampsLeague2 = {
			fantasyChampsLeagueName: 'Champions 2'
		};
		return deleteData(sampleFantasyChampsLeague2, FantasyChampsLeague)
		.then(function(deletedItem) {
			readData(sampleFantasyChampsLeague2, FantasyChampsLeague).exec()
			.then(function(deletedItem) {
				deletedItem.should.not.exist;
			});
		});
	});
});

describe('Fantasy Match', function() {
	it('should not exist', function() {
		const sampleFantasyMatch = {
			homeClub: 'another team'
		};
		
		return readData(sampleFantasyMatch, FantasyMatch).should.eventually.not.exist;
	});
	it('should create a new fantasy match', function() {
		const sampleFantasyMatch = {
			homeClub: 'another team'
		};
		
		return createData(sampleFantasyMatch, FantasyMatch).should.eventually.exist;
	});
	it('should update a fantasy match', function() {
		const sampleFantasyMatch = {
			homeClub: 'another team'
		};
		
		return updateData(sampleFantasyMatch, {homeClub: 'a third team'}, FantasyMatch)
		.then(function(updatedItem) {
			updatedItem.should.have.property('homeClub', 'a third team');
		});
	});
	it('should remove a fantasy match', function() {
		const sampleFantasyMatch2 = {
			homeClub: 'a third team'
		};
		
		return deleteData(sampleFantasyMatch2, FantasyMatch)
		.then(function(deletedItem) {
			readData(sampleFantasyMatch2, FantasyMatch).exec()
			.then(function(sampleFantasyChampsLeague2, FantasyMatch) {
				deletedItem.should.not.exist;
			});
		});
	});
});

describe('Fantasy Schedule', function() {
	it('should not exist', function() {
		const sampleFantasySchedule = {
			masterRegSeasonSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return readData(sampleFantasySchedule, FantasySchedule).should.eventually.not.exist;
	});
	it('should create a new fantasy schedule', function() {
		const sampleFantasySchedule = {
			masterRegSeasonSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return createData(sampleFantasySchedule, FantasySchedule).should.eventually.exist;
	});
	it('should update a fantasy schedule', function() {
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
		.then(function(updatedItem) {
			updatedItem.masterRegSeasonSchedule.should.have.property('homeClub', 'another team');
		});
	});
	it('should remove a fantasy schedule', function() {
		const sampleFantasySchedule2 = {
			masterRegSeasonSchedule: {
				homeClub: 'another team'
			}
		};
		
		return deleteData(sampleFantasySchedule2, FantasySchedule)
		.then(function(deletedItem) {
			readData(sampleFantasySchedule2, FantasySchedule).exec()
			.then(function(sampleFantasyChampsLeague2, FantasySchedule) {
				deletedItem.should.not.exist;
			});
		});
	});
});

describe('Player', function() {
	it('should not exist', function() {
		const samplePlayer = {
			playerPosition: 'Defender'
		};
		
		return readData(samplePlayer, Player).should.eventually.not.exist;
	});
	it('should create a new r/w player', function() {
		const samplePlayer = {
			playerPosition: 'Defender'
		};
		
		return createData(samplePlayer, Player).should.eventually.exist;
	});
	it('should update a r/w player', function() {
		const samplePlayer = {
			playerPosition: 'Defender'
		};
		
		return updateData(samplePlayer, {playerPosition: 'Midfield'}, Player)
		.then(function(updatedItem) {
			updatedItem.should.have.property('playerPosition', 'Midfield');
		});
	});
	it('should remove a r/w player', function() {
		const samplePlayer2 = {
			playerPosition: 'Midfield'
		};
		
		return deleteData(samplePlayer2, Player)
		.then(function(deletedItem) {
			readData(samplePlayer2, Player).exec()
			.then(function(samplePlayer2, Player) {
				deletedItem.should.not.exist;
			});
		});
	});
});

describe('Schedule', function() {
	it('should not exist', function() {
		const sampleSchedule = {
			masterSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return readData(sampleSchedule, Schedule).should.eventually.not.exist;
	});
	it('should create a new master schedule', function() {
		const sampleSchedule = {
			masterSchedule: {
				homeClub: 'fantasy team'
			}
		};
		
		return createData(sampleSchedule, Schedule).should.eventually.exist;
	});
	it('should update a master schedule', function() {
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
		.then(function(updatedItem) {
			updatedItem.masterSchedule.should.have.property('homeClub', 'another team');
		});
	});
	it('should remove a master schedule', function() {
		const sampleSchedule2 = {
			masterSchedule: {
				homeClub: 'another team'
			}
		};
		
		return deleteData(sampleSchedule2, Schedule)
		.then(function(deletedItem) {
			readData(sampleSchedule2, Schedule).exec()
			.then(function(sampleSchedule2, Schedule) {
				deletedItem.should.not.exist;
			});
		});
	});
});

describe('User', function() {
	it('should not exist', function() {
		const sampleUser = {
			userName: 'user1'
		};
		
		return readData(sampleUser, User).should.eventually.not.exist;
	});
	it('should create a new user', function() {
		const sampleUser = {
			userName: 'user1'
		};
		
		return createData(sampleUser, User).should.eventually.exist;
	});
	it('should update a user', function() {
		const sampleUser = {
			userName: 'user1'
		};
		
		return updateData(sampleUser, {userName: 'user2'}, User)
		.then(function(updatedItem) {
			updatedItem.should.have.property('userName', 'user2');
		});
	});
	it('should delete a user', function() {
		const sampleUser2 = {
			userName: 'user2'
		};
		
		return deleteData(sampleUser2, User)
		.then(function(deletedItem) {
			readData(sampleUser2, User).exec()
			.then(function(sampleUser2, User) {
				deletedItem.should.not.exist;
			});
		});
	});
});

describe('Fantasy League', function() {
	it('should not exist', function() {
		const sampleFantasyLeague = {
			fantasyLeagueName: 'Super Fantasy League'
		};
		
		return readData(sampleFantasyLeague, FantasyLeague).should.eventually.not.exist;
	});
	it('should create a new fantasy league', function() {
		const sampleFantasyLeague = {
			fantasyLeagueName: 'Super Fantasy League'
		};
		
		return createData(sampleFantasyLeague, FantasyLeague).should.eventually.exist;
	});
	it('should update a user', function() {
		const sampleFantasyLeague = {
			fantasyLeagueName: 'Super Fantasy League'
		};
		
		return updateData(sampleFantasyLeague, {fantasyLeagueName: 'Another Fantasy League'}, FantasyLeague)
		.then(function(updatedItem) {
			updatedItem.should.have.property('fantasyLeagueName', 'Another Fantasy League');
		});
	});
	it('should remove a fantasy league', function() {
		const sampleFantasyLeague2 = {
			fantasyLeagueName: 'Another Fantasy League'
		};
		
		return deleteData(sampleFantasyLeague2, FantasyLeague)
		.then(function(deletedItem) {
			readData(sampleFantasyLeague2, FantasyLeague).exec()
			.then(function(sampleFantasyLeague2, FantasyLeague) {
				deletedItem.should.not.exist;
			});
		});
	});
});

describe('Fantasy Club', function() {
	it('should not exist', function() {
		const sampleFantasyClub = {
			fantasyClubName: 'Strikers \'87'
		};
		
		return readData(sampleFantasyClub, FantasyClub).should.eventually.not.exist;
	});
	it('should create new fantasy club', function() {
		const sampleFantasyClub = {
			fantasyClubName: 'Strikers \'87'
		};
		
		return createData(sampleFantasyClub, FantasyClub).should.eventually.exist;
	});
	it('should update a fantasy club', function() {
		const sampleFantasyClub = {
			fantasyClubName: 'Strikers \'87'
		};
		
		return updateData(sampleFantasyClub, {fantasyClubName: 'Changed Name'}, FantasyClub)
		.then(function(updatedItem) {
			updatedItem.should.have.property('fantasyClubName', 'Changed Name');
		});
	});
	it('should remove a fantasy club', function() {
		const sampleFantasyClub2 = {
			fantasyClubName: 'Changed Name'
		};
		
		return deleteData(sampleFantasyClub2, FantasyClub)
		.then(function(deletedItem) {
			readData(sampleFantasyClub2, FantasyClub).exec()
			.then(function(sampleFantasyClub2, FantasyClub) {
				deletedItem.should.not.exist;
			});
		});
	});
});