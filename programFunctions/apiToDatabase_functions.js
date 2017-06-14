const createData = require('./crud_functions.js').createData,
	readData = require('./crud_functions.js').readData,
	updateData = require('./crud_functions.js').updateData,
	deleteData = require('./crud_functions.js').deleteData,
	allLeagueIds = require('./api_functions.js').allLeagueIds,
	seasonByLeague = require('./api_functions.js').seasonByLeague,
	matchesByLeagueSeason = require('./api_functions.js').matchesByLeagueSeason,
	playerStatsByMatch = require('./api_functions.js').playerStatsByMatch,
	Player = require('../models/player_model.js'),
	config = require('../config.js'),
	database = `${config.DATABASE_URL}/collections/players`;
	
function playerInfo(leagueId) {
  return seasonByLeague(leagueId)
  .then(seasonId => {
    console.log(`seasonId: ${seasonId}`);
     return matchesByLeagueSeason(seasonId)
      .then(matchIdList => {
        console.log(`fixtureIdList: ${matchIdList.length}`);
        matchIdList.forEach(matchId => {
          return playerStatsByMatch(matchId)
          .then(matchData => {
            // console.log(matchData);
            let player = {
              
            }
          })
          .catch(error => {
            console.log(`playerInfo playerStatsByFixture error: ${error}`);
          });
        });
      })
      .catch(error => {
        console.log(`playerInfo fixturesByLeagueSeason error: ${error}`);
      });
  })
  .catch(error => {
    console.log(`playerInfo error: ${error}`);
  });
}

playerInfo(779);