/*eslint-disable no-console*/
const {humanHomeClubScoreCalc} = require("./humanHomeClubScoreCalc_function.js"),
  {humanAwayClubScoreCalc} = require("./humanAwayClubScoreCalc_function.js"),
  {computerClubScoreCalc} = require("./computerClubScoreCalc_function.js"),
  {standingsStatsCalc} = require("./standingsStatsCalc_function.js"),
  {saveMatches} = require("./saveMatches_function.js"),
  {saveClubs} = require("./saveClubs_function.js"),
  {averageClubScoreCalc} = require("./averageClubScoreCalc_function.js");

function matchResolver(fullSchedule) {
  const today = new Date().getTime();
  let resolvedSchedule = fullSchedule.map(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    
    const datesToRun = weeklyMatches.datesToRun.getTime();
    
    if (today >= datesToRun) {
      let matchArray = weeklyMatches.matches,
        resolvedHumanScores = matchArray.map(match => {
          return humanAwayClubScoreCalc(humanHomeClubScoreCalc(match));
        }),
        resolvedMatches = resolvedHumanScores.map(match => {
          return standingsStatsCalc(computerClubScoreCalc(averageClubScoreCalc(resolvedHumanScores), match));
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
    resolvedWeek.matches.forEach(match => {
      saveClubs(match.homeClub);
      saveClubs(match.awayClub);
    });
  });
  
  return resolvedSchedule;
}

module.exports = {
  matchResolver
};