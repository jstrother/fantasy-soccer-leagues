const {saveMatches} = require("./saveMatches_function.js"),
  {saveClub} = require("./saveClub_function.js");
  
function saveToDB(resolvedSchedule) {
  let roundNumbersArray = [];
  
  resolvedSchedule.map(week => {
    let matchArray = week.matches;
    saveMatches(matchArray);
    matchArray.filter(match => {
      if (match.final === true) {
        // console.log('homeClub.gamesPlayed:', match.homeClub.gamesPlayed);
        // console.log('awayClub.gamesPlayed:', match.awayClub.gamesPlayed);
        roundNumbersArray.push(week.roundNumber);
      }
    });
  });
  
  let highestRoundNumber = Math.max(...roundNumbersArray);
  // console.log('highestRoundNumber:', highestRoundNumber);
  let highestRound = resolvedSchedule.filter(week => {
    // console.log('week:', week);
     return (week.roundNumber === highestRoundNumber);
  });
  // console.log('highestRound:', highestRound);
  
  return saveClub(highestRound[0].matches[0].homeClub)
  .then(() => {
    return saveClub(highestRound[0].matches[0].awayClub);
  });
}

module.exports = {
  saveToDB
};