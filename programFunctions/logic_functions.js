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
    // console.log(teams.data[0].players.data[0]);
    for (let i = 0; i < teams.data.length; i++) {
      for (let j = 0; j < teams.data[i].players.data.length; j++) {
        playersGrabber(teams.data[i].players.data[j].id)
        .then(player => {
          let thisPlayer = {
            playerName: player.fullname,
            playerClub: player.team.name,
            playerPosition: player.position.name
          };
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
      }
    }
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

createPlayer(66);

exports.createPlayer = createPlayer;