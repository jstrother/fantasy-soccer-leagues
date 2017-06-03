const 
    // import common modules
    { mongoose, dbTestConnection } = require('./common.js'),
    // import api functions
    { playersByLeagueGrabber } = require('../programFunctions/api_functions.js');
	
// describe('Players By League Grabber', () => {
// 	it('should return all players in the league searched for', () => {
// 		const leagueId = 501;
		
// 		return playersByLeagueGrabber(leagueId)
// 		.then(league => {
// 			league.id.should.equal(501);
// 			league.name.should.equal('Premiership');
// 			return league.data.season;
// 		})
// 		.then(season => {
// 			season.id.should.equal(825);
// 			season.name.should.equal('2016/2017');
// 		})
// 		.catch(error => {
// 			console.log(`error: ${error}`);
// 		});
// 	})
// 	.timeout(5000);
// });