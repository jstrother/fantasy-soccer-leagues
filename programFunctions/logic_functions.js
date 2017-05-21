const { competitionGrabber, seasonGrabber, teamsGrabber, rosterGrabber, playersGrabber, matchGrabber, matchStatsGrabber } = require('../programFunctions/api_functions.js'),
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
        let player = playersGrabber(teams.data[i].players.data[j]);
        console.log(player.name);
        // return createData(player, 'Player');
      }
    }
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

createPlayer(66);

exports.createPlayer = createPlayer;