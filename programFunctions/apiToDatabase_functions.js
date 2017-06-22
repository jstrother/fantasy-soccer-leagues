const createData = require('./crud_functions.js').createData,
	readData = require('./crud_functions.js').readData,
	updateData = require('./crud_functions.js').updateData,
	deleteData = require('./crud_functions.js').deleteData,
	allLeagueIds = require('./api_functions.js').allLeagueIds,
	seasonByLeague = require('./api_functions.js').seasonByLeague,
	matchesByLeagueSeason = require('./api_functions.js').matchesByLeagueSeason,
	teamPlayerIdsBySeason = require('./api_functions.js').teamPlayerIdsBySeason,
	playerByIdBySeason = require('./api_functions.js').playerByIdBySeason,
	playerStatsByMatch = require('./api_functions.js').playerStatsByMatch,
	Player = require('../models/player_model.js');
	
function playerInfo(leagueId) {
  return seasonByLeague(leagueId)
  .then(seasonId => {
    return teamPlayerIdsBySeason(seasonId)
    .then(playerIdList => {
      playerIdList.forEach(playerId => {
        return playerByIdBySeason(playerId, seasonId)
        .then(player => {
          if (player.playerIdFromAPI) {
            if (Player.find().exists({playerIdFromAPI: player.playerIdFromAPI}, false)) {
              createData(player, Player);
            }
          }
        })
        .catch(error => {
          console.log(`playerInfo playerByIdBySeason error: ${error}`);
        });
      });
    })
    .catch(error => {
      console.log(`playerInfo teamPlayerIdsBySeason error: ${error}`);
    });
  })
  .catch(error => {
    console.log(`playerInfo error: ${error}`);
  });
}

// playerInfo(779);

exports.playerInfo = playerInfo;