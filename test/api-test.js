const 
    // import common modules
    { mongoose, apiTestConnection } = require('./common.js'),
    // import api functions
    { scheduleGrabber, playerGameStatsGrabber, playerSeasonStatsGrabber, competitionFixturesGrabber } = require('../api_functions.js');

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
	
describe('Schedule Grabber', () => {
  it('should retrieve current MLS schedule', () => {
  	const roundId = 117;
  	
  	return scheduleGrabber(roundId)
  	.then((schedule) => {
        schedule.should.be.an.object;
    })
		.catch(error => {
			console.log(`error: ${error}`);
		});
  });
});

describe('Player Game Stats Grabber', () => {
	it('should retrieve a players stats by game', () => {
		const date = '2017-05-06',
			playerId = 90032467;
		
		return playerGameStatsGrabber(date, playerId)
		.then((player) => {
			player.should.be.an.object;
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
});

describe('Player Season Stats Grabber', () => {
	it('should retrieve a players stats of the season so far', () => {
		const roundId = 117,
			playerId = 90032467;
		
		return playerSeasonStatsGrabber(roundId, playerId)
		.then((player) => {
			player.should.be.an.object;
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	});
});

describe('Competition Grabber', () => {
	it('should retrieve the roundId of regular season and list of players in league', () => {
		const competitionId = 8;
		
		return competitionFixturesGrabber(competitionId)
		.then((competition) => {
			competition.should.be.an.object;
		})
		.catch(error => {
			console.log(`error: ${error}`);
		});
	})
	.timeout(7000);
});