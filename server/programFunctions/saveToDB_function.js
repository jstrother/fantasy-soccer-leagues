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
  
  // don't forget that filter returns an array!
  let highestRound = resolvedSchedule.filter(week => {
     return (week.roundNumber === highestRoundNumber);
  });
  console.log('highestRound:', highestRound);
  let resolvedClubs = highestRound[0].matches.map(match => {
    return saveClub(match.homeClub)
    .then(() => {
      return saveClub(match.awayClub);
    });
  });
  
  console.log('resolved');
  Promise.all(resolvedClubs)
  .then((resolvedData) => {
    console.log('resolvedClubs:', resolvedData);
  });
}

module.exports = {
  saveToDB
};