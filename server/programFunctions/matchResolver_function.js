/*eslint-disable no-console*/
const {standingsStatsCalc} = require("./standingsStatsCalc_function.js"),
  {saveMatches} = require("./saveMatches_function.js");

function matchResolver(fullSchedule, clubArray) {
  const today = new Date().getTime();
  let resolvedMatches = [];
    
  fullSchedule.forEach(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    let matchArray = weeklyMatches.matches;
    
    const roundNumber = weeklyMatches.roundNumber,
      gamesPlayed = matchArray[0].homeClub.gamesPlayed,
      datesToRun = weeklyMatches.datesToRun.getTime();
    
    if (today > datesToRun && gamesPlayed < roundNumber) {
      console.log('gamesPlayed:', gamesPlayed);
      console.log('roundNumber:', roundNumber);
      console.log('');
      resolvedMatches.push(saveMatches(standingsStatsCalc(matchArray)));
    }
  });
  
  return resolvedMatches;
}

module.exports = {
  matchResolver
};