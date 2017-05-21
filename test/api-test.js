const 
    // import common modules
    { mongoose, apiTestConnection } = require('./common.js'),
    // import api functions
    { competitionGrabber, seasonGrabber, teamsGrabber, rosterGrabber, playersGrabber, matchGrabber, matchStatsGrabber } = require('../api_functions.js');

before(done => {
	mongoose.connect(apiTestConnection);
	mongoose.connection.on('connected', () => {
		console.log('connection made to apiTestConnection');
		mongoose.connection.db.dropDatabase();
	});
	done();
});

after(done => {
	mongoose.disconnect();
	mongoose.connection.on('disconnected', () => {
		console.log('disconnected from apiTestConnection');
		mongoose.connection.db.dropDatabase();
	});
	done();
});
	
describe('Competition Grabber', () => {
	it('should return the competition searched for', () => {
		const competitionId = 66;
		
		return competitionGrabber(competitionId)
		.then(competition => {
			competition.id.should.equal(66);
			competition.name.should.equal('Premiership');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	})
	.timeout(5000);
});

describe('Season Grabber', () => {
	it('should return the season searched for', () => {
		const seasonId = 741;
		
		return seasonGrabber(seasonId)
		.then(season => {
			season.id.should.equal(741);
			season.name.should.equal('2016/2017');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Teams Grabber', () => {
	it('should return teams in a given season', () => {
		const seasonId = 741;
		
		return teamsGrabber(seasonId)
		.then(teams => {
			teams.data[0].id.should.equal(152);
			teams.data[0].name.should.equal('Celtic');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Roster Grabber', () => {
	it('should return a roster for a given team in a given season', () => {
		const seasonId = 741,
			teamId = 152;
			
		return rosterGrabber(teamId, seasonId)
		.then(roster => {
			roster.players.data[0].id.should.equal(217);
			roster.players.data[0].name.should.equal('S. Armstrong');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Player Grabber', () => {
	it('should return info for a given player', () => {
		const playerId = 217;
		
		return playersGrabber(playerId)
		.then(player => {
			player.id.should.equal(217);
			player.name.should.equal('S. Armstrong');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Match Grabber', () => {
	it('should info for a given match', () => {
		const matchId = 687992;
		
		return matchGrabber(matchId)
		.then(match => {
			match.id.should.equal(687992);
			match.home_team_id.should.equal(701);
			match.away_team_id.should.equal(152);
			match.homeTeam.name.should.equal('Hearts');
			match.awayTeam.name.should.equal('Celtic');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});

describe('Match Stats Grabber', () => {
	it('should return stats for a given match', () => {
		const matchId = 687993;
		
		return matchStatsGrabber(matchId)
		.then(matchStats => {
			matchStats.home.id.should.equal(28422);
			matchStats.home.team_id.should.equal(696);
			matchStats.away.id.should.equal(28423);
			matchStats.away.team_id.should.equal(700);
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	}).timeout(5000);
});