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
  
  // return saveClub(highestRound[0].matches[0].homeClub)
  // .then(() => {
  //   return saveClub(highestRound[0].matches[0].awayClub);
  // });
  
  let resolvedClubs = highestRound[0].matches.map(match => {
    return saveClub(match.homeClub)
    .then(() => {
      return saveClub(match.awayClub);
    });
  });
  
  // console.log('resolvedClubs:', resolvedClubs);
  return resolvedClubs;
}

module.exports = {
  saveToDB
};