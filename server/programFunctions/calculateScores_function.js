const {humanHomeClubScoreCalc} = require("./humanHomeClubScoreCalc_function.js"),
  {humanAwayClubScoreCalc} = require("./humanAwayClubScoreCalc_function.js"),
  {computerClubScoreCalc} = require("./computerClubScoreCalc_function.js"),
  {standingsStatsCalc} = require("./standingsStatsCalc_function.js"),
  {averageClubScoreCalc} = require("./averageClubScoreCalc_function.js");

function calculateScores(weeklyMatches) {
  // first we deep clone our input data as a let since we modify this later
  let resolvedWeek = JSON.parse(JSON.stringify(weeklyMatches));
  // next we calculate all scores for clubs run by humans
  const resolvedHumanScores = weeklyMatches.matches.map(match => {
      return humanAwayClubScoreCalc(humanHomeClubScoreCalc(match));
    });
  // then we calculate the scores for clubs run by a computer AND the stats of all clubs need for league standings and set it all equal to a portion of our deep clone from above
  resolvedWeek.matches = resolvedHumanScores.map(match => {
    return standingsStatsCalc(computerClubScoreCalc(averageClubScoreCalc(resolvedHumanScores), match));
    });
  
  return resolvedWeek;
}

module.exports = {
  calculateScores
};