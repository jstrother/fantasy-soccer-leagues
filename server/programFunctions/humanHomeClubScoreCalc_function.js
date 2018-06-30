const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanHomeClubScoreCalc(match) {
  let resolvedMatch = JSON.parse(JSON.stringify(match));
  resolvedMatch.homeScore = humanScoreCalc(match.homeClub);
  return resolvedMatch;
}

module.exports = {
  humanHomeClubScoreCalc
};