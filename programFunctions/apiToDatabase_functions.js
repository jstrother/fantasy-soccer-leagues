const createData = require('./crud_functions.js').createData,
	readData = require('./crud_functions.js').readData,
	updateData = require('./crud_functions.js').updateData,
	deleteData = require('./crud_functions.js').deleteData,
	allLeagueIds = require('./api_functions.js').allLeagueIds,
	seasonByLeague = require('./api_functions.js').seasonByLeague,
	fixturesByLeagueSeason = require('./api_functions.js').fixturesByLeagueSeason,
	playerStatsByFixture = require('./api_functions.js').playerStatsByFixture,
	Player = require('../models/player_model.js'),
	config = require('../config.js'),
	database = `${config.DATABASE_URL}/collections/players`;
	
function playerInfo(leagueId) {
  seasonByLeague(leagueId)
  .then(seasonId => {
    console.log(`seasonId: ${seasonId}`);
    Promise.all(seasonId => {
      fixturesByLeagueSeason(seasonId)
      .then(fixtureIdList => {
        console.log(`fixtureIdList: ${fixtureIdList}`);
      })
      .catch(error => {
        console.log(`playerInfo fixturesByLeagueSeason error: ${error}`);
      });
    });
  })
  .catch(error => {
    console.log(`playerInfo error: ${error}`);
  });
}

playerInfo(779);