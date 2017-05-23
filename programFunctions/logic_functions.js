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
    // console.log(teams.data[0].players.data[0].name);
    for (let i = 0; i < 10; i++) { //teams.data.length
      for (let j = 0; j < 10; j++) { //teams.data[i].players.data.length
        console.log(`player: ${teams.data[i].players.data[j]}`);
        playersGrabber(teams.data[i].players.data[j])
        .then(player => {
          console.log(`player: ${player}`);
          // let thisPlayer = {
          //   playerName: player.name,
          //   playerClub: player.team.name,
          //   playerPosition: player.position.name
          // };
          // console.log(`thisPlayer: ${thisPlayer}`);
        })
        .catch(error => {
          console.log(`createPlayer for-loop error: ${error}`);
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