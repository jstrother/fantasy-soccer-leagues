/*eslint-disable no-console*/
const {standingsStatsCalc} = require("./standingsStatsCalc_function.js");

function basicMatchResolver(fullSchedule, clubArray) {
  const today = new Date().getTime();
  let resolvedMatches = [];
    
  fullSchedule.forEach(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    let matchArray = weeklyMatches.matches;
    if (today > weeklyMatches.datesToRun.getTime()) {
      resolvedMatches = standingsStatsCalc(matchArray);
    }
  });
  
  return resolvedMatches;
}

module.exports = {
  basicMatchResolver
};