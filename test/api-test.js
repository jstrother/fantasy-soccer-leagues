const 
    // import common modules
    { mongoose } = require('./common.js'),
    // import api functions
    { allLeagues } = require('../programFunctions/api_functions.js');
	
describe('All Leagues', () => {
	it('should grab all leagues in the plan', () => {
		return allLeagues()
		.then(leagues => {
			leagues.meta.pagination.total.should.equal(638);
		})
		.catch(error => {
			console.log(`allLeagues test error: ${error}`);
		});
	}).timeout(5000);
});