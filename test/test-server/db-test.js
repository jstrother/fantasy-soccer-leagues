const
	// import common modules
	{ mongoose, dbTestConnection, chai, should } = require('../common.js'),
	// all models
	User = require('../../models/user_model.js'),
	FantasyClub = require('../../models/fantasyClub_model.js'),
	FantasyLeague = require('../../models/fantasyLeague_model.js'),
	FantasyChampsLeague = require('../../models/fantasyChampsLeague_model.js'),
	FantasySchedule = require('../../models/fantasySchedule_model.js'),
	FantasyMatch = require('../../models/fantasyMatch_model.js'),
	FantasyDivision = require('../../models/fantasyDivision_model.js'),
	Player = require('../../models/player_model.js'),
	// import updateData function to keep options consistent throughout
	{ updateData } = require('../../server/programFunctions/updateData_function.js');

describe('Champions League', () => {
	it('should not exist', () => {
		const sampleFantasyChampsLeague = {
			fantasyChampsLeagueName: 'Champions 1'
		};
		
		return FantasyChampsLeague.findOne(sampleFantasyChampsLeague).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new champions league', () => {
		const sampleFantasyChampsLeague = {
			name: 'Champions 1'
		};
		
		return FantasyChampsLeague.create(sampleFantasyChampsLeague).should.eventually.exist;
	}).timeout(5000);
	it('should update a champions league', () => {
		const sampleFantasyChampsLeague = {
			name: 'Champions 1'
		};
		
		return updateData(
			sampleFantasyChampsLeague,
			{
				name: 'Champions 2'
			},
			FantasyChampsLeague
		)
		.then(updatedItem => {
			should.exist(updatedItem);
			updatedItem.should.have.property('name', 'Champions 2');
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
	it('should remove a champions league', () => {
		const sampleFantasyChampsLeague = {
			name: 'Champions 2'
		};
		
		return FantasyChampsLeague.findOneAndRemove(sampleFantasyChampsLeague)
		.then(deletedItem => {
			FantasyChampsLeague.findOne(sampleFantasyChampsLeague)
			.then(deletedItem => {
				should.not.exist(deletedItem);
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
});

describe('Fantasy Schedule', () => {
	it('should not exist', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 100
		};
		
		return FantasySchedule.findOne(sampleFantasySchedule).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new fantasy schedule', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 100
		};
		
		return FantasySchedule.create(sampleFantasySchedule).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy schedule', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 100
		};
		
		return updateData(
			sampleFantasySchedule,
			{
				numLeagueSeasonMatches: 101
			},
			FantasySchedule
		)
		.then(updatedItem => {
			should.exist(updatedItem);
			updatedItem.should.have.property('numLeagueSeasonMatches', 101);
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
	it('should remove a fantasy schedule', () => {
		const sampleFantasySchedule = {
			numLeagueSeasonMatches: 101
		};
		
		return FantasySchedule.findOneAndRemove(sampleFantasySchedule)
		.then(deletedItem => {
			FantasySchedule.findOne(sampleFantasySchedule)
			.then(deletedItem => {
				should.not.exist(deletedItem);
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
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
		
		return User.findOne(sampleUser).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new user', () => {
		const sampleUser = {
			displayName: 'user1',
			accessToken: '42',
			googleId: '1974'
		};
		
		return User.create(sampleUser).should.eventually.exist;
	}).timeout(5000);
	it('should update a user', () => {
		const sampleUser = {
			displayName: 'user1',
			accessToken: '42',
			googleId: '1974'
		};
		
		return updateData(
			sampleUser, 
			{
				displayName: 'user2'
			},
			User
		)
		.then(updatedItem => {
			should.exist(updatedItem);
			updatedItem.should.have.property('displayName', 'user2');
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
	it('should delete a user', () => {
		const sampleUser2 = {
			displayName: 'user2',
			accessToken: '42',
			googleId: '1974'
		};
		
		return User.findOneAndRemove(sampleUser2)
		.then(deletedItem => {
			User.findOne(sampleUser2)
			.then(deletedItem => {
				should.not.exist(deletedItem);
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
});

describe('Fantasy League', () => {
	it('should not exist', () => {
		const sampleFantasyLeague = {
			Name: 'Super Fantasy League'
		};
		
		return FantasyLeague.findOne(sampleFantasyLeague).should.eventually.not.exist;
	}).timeout(5000);
	it('should create a new fantasy league', () => {
		const sampleFantasyLeague = {
			Name: 'Super Fantasy League'
		};
		
		return FantasyLeague.create(sampleFantasyLeague).should.eventually.exist;
	}).timeout(5000);
	it('should update a user', () => {
		const sampleFantasyLeague = {
			Name: 'Super Fantasy League'
		};
		
		return updateData(
			sampleFantasyLeague, 
			{
				Name: 'Another Fantasy League'
			},
			FantasyLeague
		)
		.then(updatedItem => {
			should.exist(updatedItem);
			updatedItem.should.have.property('Name', 'Another Fantasy League');
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
	it('should remove a fantasy league', () => {
		const sampleFantasyLeague2 = {
			Name: 'Another Fantasy League'
		};
		
		return FantasyLeague.findOneAndRemove(sampleFantasyLeague2)
		.then(deletedItem => {
			FantasyLeague.findOne(sampleFantasyLeague2)
			.then(deletedItem => {
				should.not.exist(deletedItem);
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
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
		
		return FantasyClub.findOne(sampleFantasyClub).should.eventually.not.exist;
	}).timeout(5000);
	it('should create new fantasy club', () => {
		const sampleFantasyClub = {
			name: 'Team Name',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		return FantasyClub.create(sampleFantasyClub).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy club', () => {
		const sampleFantasyClub = {
			name: 'Team Name',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		return updateData(
			sampleFantasyClub, 
			{
				division: 'Test Division 2'
			},
			FantasyClub
		)
		.then(updatedItem => {
			should.exist(updatedItem);
			updatedItem.should.have.property('division', 'Test Division 2');
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
	it('should remove a fantasy club', () => {
		const sampleFantasyClub = {
			name: 'Team Name',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 2'
		};
		
		return FantasyClub.findOneAndRemove(sampleFantasyClub)
		.then(deletedItem => {
			FantasyClub.findOne(sampleFantasyClub)
			.then(deletedItem => {
				should.not.exist(deletedItem);
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
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
		return FantasyClub.create(homeClub)
		.then((homeClub) => {
			return FantasyClub.create(awayClub)
			.then((awayClub) => {
				const sampleFantasyMatch = {
					matchId: 1,
					matchType: 'Regular Season',
					homeClub,
					homeScore: 0,
					awayClub,
					awayScore: 0
				};
				return FantasyMatch.findOne(sampleFantasyMatch).should.eventually.not.exist;
			})
			.catch((error) => {
				console.log(`Fantasy Match should create new inner then error: ${error}`);
			});
		})
		.catch((error) => {
			console.log(`Fantasy Match should create new outer then error: ${error}`);
		});
	}).timeout(5000);
	it('should create new fantasy match', () => {
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
		
		return FantasyClub.create(homeClub)
		.then((homeClub) => {
			return FantasyClub.create(awayClub)
			.then((awayClub) => {
				const sampleFantasyMatch = {
					matchId: 1,
					matchType: 'Regular Season',
					homeClub,
					homeScore: 0,
					awayClub,
					awayScore: 0
				};
				return FantasyMatch.create(sampleFantasyMatch).should.eventually.exist;
			})
			.catch((error) => {
				console.log(`Fantasy Match should create new inner then error: ${error}`);
			});
		})
		.catch((error) => {
			console.log(`Fantasy Match should create new outer then error: ${error}`);
		});
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
		
		return FantasyClub.create(homeClub)
		.then((homeClub) => {
			return FantasyClub.create(awayClub)
			.then((awayClub) => {
				const sampleFantasyMatch = {
					matchId: 1,
					matchType: 'Regular Season',
					homeClub,
					homeScore: 0,
					awayClub,
					awayScore: 0
				};
				return updateData(
					sampleFantasyMatch, 
					{
						homeScore: 2,
						awayScore: 1
					},
					FantasyMatch
				)
				.then(updatedItem => {
					should.exist(updatedItem);
					updatedItem.should.have.property('homeScore', 2);
					updatedItem.should.have.property('awayScore', 1);
				})
				.catch(error => {
				console.log(`Fantasy Match update error: ${error}`);
				});
			})
			.catch((error) => {
				console.log(`Fantasy Match should delete inner then error: ${error}`);
			});
		})
		.catch((error) => {
			console.log(`Fantasy Match should update outer then error: ${error}`);
		});
	}).timeout(5000);
	it('should remove a fantasy match', () => {
		const homeClub = {
			name: 'Home4',
			manager: 'Coach',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		const awayClub = {
			name: 'Away4',
			manager: 'Boss',
			league: 'Test League',
			division: 'Test Division 1'
		};
		
		return FantasyClub.create(homeClub)
		.then((homeClub) => {
			return FantasyClub.create(awayClub)
			.then((awayClub) => {
				const sampleFantasyMatch = {
					matchId: 1,
					matchType: 'Regular Season',
					homeClub,
					homeScore: 0,
					awayClub,
					awayScore: 0
				};
				return FantasyMatch.findOneAndRemove(sampleFantasyMatch)
				.then(deletedItem => {
					FantasyMatch.findOne(sampleFantasyMatch)
					.then(deletedItem => {
						should.not.exist(deletedItem);
					})
					.catch(error => {
						throw new Error(error);
					});
				})
				.catch(error => {
					throw new Error(error);
				});
			})
			.catch((error) => {
				console.log(`Fantasy Match should delete inner then error: ${error}`);
			});
		})
		.catch((error) => {
			console.log(`Fantasy Match should delete outer then error: ${error}`);
		});
	}).timeout(5000);
});

describe('Fantasy Division', () => {
	it('should not exist', () => {
		const sampleFantasyDivision = {
			name: 'Team Division 1'
		};
		
		return FantasyDivision.findOne(sampleFantasyDivision).should.eventually.not.exist;
	}).timeout(5000);
	it('should create new fantasy division', () => {
		const sampleFantasyDivision = {
			name: 'Team Division 1'
		};
		
		return FantasyDivision.create(sampleFantasyDivision).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy division', () => {
		const sampleFantasyDivision = {
			name: 'Team Division 1'
		};
		
		return updateData(
			sampleFantasyDivision, 
			{
				name: 'Test Division 2'
			},
			FantasyDivision
		)
		.then(updatedItem => {
			should.exist(updatedItem);
			updatedItem.should.have.property('name', 'Test Division 2');
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
	it('should remove a fantasy division', () => {
		const sampleFantasyDivision = {
			name: 'Team Division 2'
		};
		
		return FantasyDivision.findOneAndRemove(sampleFantasyDivision)
		.then(deletedItem => {
			FantasyDivision.findOne(sampleFantasyDivision)
			.then(deletedItem => {
				should.not.exist(deletedItem);
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
});

describe('Player', () => {
	it('should not exist', () => {
		const samplePlayer = {
			idFromAPI: 77,
			firstName: 'Bob'
		};
		
		return Player.findOne(samplePlayer).should.eventually.not.exist;
	}).timeout(5000);
	it('should create new fantasy division', () => {
		const samplePlayer = {
			idFromAPI: 77
		};
		
		return Player.create(samplePlayer).should.eventually.exist;
	}).timeout(5000);
	it('should update a fantasy division', () => {
		const samplePlayer = {
			idFromAPI: 77
		};
		
		return updateData(
			samplePlayer, 
			{
				firstName: 'Joe'
			},
			Player
		)
		.then(updatedItem => {
			should.exist(updatedItem);
			updatedItem.should.have.property('firstName', 'Joe');
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
	it('should remove a fantasy division', () => {
		const samplePlayer = {
			idFromAPI: 77
		};
		
		return Player.findOneAndRemove(samplePlayer)
		.then(deletedItem => {
			Player.findOne(samplePlayer, )
			.then(deletedItem => {
				should.not.exist(deletedItem);
			})
			.catch(error => {
				throw new Error(error);
			});
		})
		.catch(error => {
			throw new Error(error);
		});
	}).timeout(5000);
});