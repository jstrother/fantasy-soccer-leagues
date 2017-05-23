const { competitionGrabber, seasonGrabber, teamsGrabber, playersGrabber, matchGrabber, matchStatsGrabber } = require('../programFunctions/api_functions.js'),
  { createData, readData, updateData, deleteData } = require('../programFunctions/crud_functions.js');

function createPlayer(competitionId) {
  return competitionGrabber(competitionId)
  .then(competition => {
    return seasonGrabber(competition.currentSeason.id);
  })
  .then(season => {
    return teamsGrabber(season.id);
  })
  .then(teams => {
    for (let i = 0; i < 2; i++) { //teams.data.length
      for (let j = 0; j < 2; j++) { //teams.data[i].players.data.length
        console.log(teams.data[i].players.data[1]);
        playersGrabber(teams.data[i].players.data[j].id)
        .then(player => {
          // console.log(`player from then: ${player.position.name}`);
          let thisPlayer = {
            playerName: player.name || player.fullname,
            playerClub: player.team.name,
            playerPosition: player.position.name
          };
          // console.log(`thisPlayer: ${thisPlayer.playerName}`);
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
      }
    }
  })
  .catch(error => {
    console.log(`createPlayer error: ${error}`);
  });
}

createPlayer(66);

exports.createPlayer = createPlayer;