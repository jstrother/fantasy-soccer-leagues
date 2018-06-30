/*eslint-disable no-console*/
const {humanHomeClubScoreCalc} = require("./humanHomeClubScoreCalc_function.js"),
  {humanAwayClubScoreCalc} = require("./humanAwayClubScoreCalc_function.js"),
  {computerClubScoreCalc} = require("./computerClubScoreCalc_function.js"),
  {standingsStatsCalc} = require("./standingsStatsCalc_function.js"),
  {saveMatches} = require("./saveMatches_function.js"),
  {averageClubScoreCalc} = require("./averageClubScoreCalc_function.js");

function matchResolver(fullSchedule) {
  const today = new Date().getTime();
  let resolvedSchedule = fullSchedule.map(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    
    const datesToRun = weeklyMatches.datesToRun.getTime();
    
    if (today >= datesToRun) {
      let matchArray = weeklyMatches.matches,
        resolvedMatches = matchArray.map(match => {
          return standingsStatsCalc(
            computerClubScoreCalc(
              averageClubScoreCalc(matchArray), // averageClubScoreCalc and humanAwayClubScoreCalc are both fed into computerClubScoreCalc
              humanAwayClubScoreCalc(
                humanHomeClubScoreCalc(match))));
        }),
        resolvedWeek = JSON.parse(JSON.stringify(weeklyMatches));
      
      resolvedWeek.matches = resolvedMatches;
      return resolvedWeek;
    }
    if (today < datesToRun) {
      return JSON.parse(JSON.stringify(weeklyMatches));
    }
  });
  
  resolvedSchedule.forEach(resolvedWeek => {
    saveMatches(resolvedWeek.matches);
  });
  
  return resolvedSchedule;
}

module.exports = {
  matchResolver
};