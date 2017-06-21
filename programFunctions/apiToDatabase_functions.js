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
      return playerByIdBySeason(playerIdList[0], seasonId)
      .then(player => {
        if (!(Player.where('playerIdFromAPI', player.playerIdFromAPI))) {
          createData(player, Player);
        }
      })
      .catch(error => {
        console.log(`playerInfo playerByIdBySeason error: ${error}`);
      });
      // let playerList = [];
      // playerIdList.forEach(playerId => {
      //   return playerByIdBySeason(playerId, seasonId)
      //   .then(player => {
      //     console.log(player);
      //   })
      //   .catch(error => {
      //     console.log(`playerInfo playerByIdBySeason error: ${error}`);
      //   });
      // });
    })
    .catch(error => {
      console.log(`playerInfo teamPlayerIdsBySeason error: ${error}`);
    });
  })
  .catch(error => {
    console.log(`playerInfo error: ${error}`);
  });
}

playerInfo(779);

exports.playerInfo = playerInfo;