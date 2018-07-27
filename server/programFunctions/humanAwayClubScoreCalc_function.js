const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanAwayClubScoreCalc(match) {
  console.log('humanAwayClubScoreCalc match.final:', match.final);
  if (match.final === false) {
    let resolvedMatch = JSON.parse(JSON.stringify(match));
    resolvedMatch.awayScore = humanScoreCalc(match.awayClub);
    return resolvedMatch;
  }
  if (match.final === true) {
    return JSON.parse(JSON.stringify(match));
  }
}

module.exports = {
  humanAwayClubScoreCalc
};