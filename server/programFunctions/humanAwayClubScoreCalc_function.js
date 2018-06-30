const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanAwayClubScoreCalc(match) {
  let resolvedMatch = JSON.parse(JSON.stringify(match));
    resolvedMatch.awayScore = humanScoreCalc(match.awayClub);
    return resolvedMatch;
}

module.exports = {
  humanAwayClubScoreCalc
};