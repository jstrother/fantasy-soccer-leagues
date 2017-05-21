const 
    // import common modules
    { mongoose, apiTestConnection } = require('./common.js'),
    // import api functions
    { competitionGrabber, seasonGrabber, teamsGrabber, rosterGrabber } = require('../api_functions.js');

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
	.timeout(7000);
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
	});
});

describe('Teams Grabber', () => {
	it('should return teams in a given season', () => {
		const seasonId = 741;
		// if Celtic gets relegated somehow, change this test
		return teamsGrabber(seasonId)
		.then(teams => {
			teams.data[0].id.should.equal(152);
			teams.data[0].name.should.equal('Celtic');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
});

describe('Roster Grabber', () => {
	it('should return a roster for a given team in a given season', () => {
		const seasonId = 741,
			teamId = 152;
		// this test should be changed every off-season at the least to reflect any roster changes
		return rosterGrabber(teamId, seasonId)
		.then(roster => {
			roster.players.data[0].id.should.equal(217);
			roster.players.data[0].name.should.equal('S. Armstrong');
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
});