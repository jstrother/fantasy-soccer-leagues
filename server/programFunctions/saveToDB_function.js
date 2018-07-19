const {saveMatches} = require("./saveMatches_function.js"),
  {saveClub} = require("./saveClub_function.js");
  
function saveToDB(resolvedSchedule) {
  let roundNumbersArray = [];
  
  resolvedSchedule.map(week => {
    let matchArray = week.matches;
    saveMatches(matchArray);
    matchArray.filter(match => {
      if (match.final === true) {
        roundNumbersArray.push(week.roundNumber);
      }
    });
  });
  
  const highestRoundNumber = Math.max(...roundNumbersArray);
  
  let highestRound = resolvedSchedule.filter(week => {
     return (week.roundNumber === highestRoundNumber);
  });
  
  let resolvedClubs = highestRound[0].matches.map(match => {
    return saveClub(match.homeClub)
    .then(() => {
      return saveClub(match.awayClub);
    });
  });
  
  return Promise.all(resolvedClubs);
}

module.exports = {
  saveToDB
};