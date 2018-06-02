/*eslint-disable no-console*/
const {standingsStatsCalc} = require("./standingsStatsCalc_function.js"),
  {saveMatches} = require("./saveMatches_function.js");

function matchResolver(fullSchedule) {
  const today = new Date().getTime();
  let resolvedSchedule = fullSchedule.map(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    let matchArray = weeklyMatches.matches,
      gamesPlayed = matchArray[0].homeClub.gamesPlayed;
    
    const roundNumber = weeklyMatches.roundNumber,
      datesToRun = weeklyMatches.datesToRun.getTime();
    
    if (today > datesToRun && gamesPlayed < roundNumber) {
      return (
        {
          weeklyMatches: saveMatches(standingsStatsCalc(matchArray))
        }
      );
    }
  });
  
  console.log('matchResolver:', resolvedSchedule);
  return resolvedSchedule;
}

module.exports = {
  matchResolver
};