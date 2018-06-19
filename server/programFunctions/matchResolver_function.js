/*eslint-disable no-console*/
const {humanHomeClubScoreCalc} = require("./humanHomeClubScoreCalc_function.js"),
  {humanAwayClubScoreCalc} = require("./humanAwayClubScoreCalc_function.js"),
  {computerClubScoreCalc} = require("./computerClubScoreCalc_function.js"),
  {standingsStatsCalc} = require("./standingsStatsCalc_function.js"),
  {saveMatches} = require("./saveMatches_function.js");

function matchResolver(fullSchedule) {
  const today = new Date().getTime();
  let resolvedSchedule = fullSchedule.map(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    let matchArray = weeklyMatches.matches;
    
    const datesToRun = weeklyMatches.datesToRun.getTime();
    
    if (today >= datesToRun) {
      let resolvedWeek = JSON.parse(JSON.stringify(weeklyMatches));
      
      resolvedWeek.matches = 
        standingsStatsCalc(
          computerClubScoreCalc(
            humanAwayClubScoreCalc(
              humanHomeClubScoreCalc(matchArray))));
      
      saveMatches(resolvedWeek.matches);
      console.log('resolvedWeek:', resolvedWeek);  
      return resolvedWeek;
    }
    if (today < datesToRun) {
      return weeklyMatches;
    }
  });
  
  return resolvedSchedule;
}

module.exports = {
  matchResolver
};