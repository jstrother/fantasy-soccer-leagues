const { competitionGrabber, seasonGrabber, teamsGrabber, rosterGrabber, playersGrabber, matchGrabber, matchStatsGrabber } = require('../programFunctions/api_functions.js'),
  { createData, readData, updateData, deleteData } = require('../programFunctions/crud_functions.js');

function realWorldClub(competitionId) {
  return competitionGrabber(competitionId)
  .then(competition => {
    return seasonGrabber(competition.currentSeason.id);
  })
  .then(season => {
    return teamsGrabber(season.id);
  })
  .then(teams => {
    console.log(teams.data[0]);
    for (let i = 0; i < teams.length; i++) {
      console.log(teams.data[i]);
    }
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

realWorldClub(66);

exports.realWorldClub = realWorldClub;