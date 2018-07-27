const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanHomeClubScoreCalc(match) {
  console.log('humanHomeClubScoreCalc match.final:', match.final);
  if (match.final === false) {
    let resolvedMatch = JSON.parse(JSON.stringify(match));
    resolvedMatch.homeScore = humanScoreCalc(match.homeClub);
    return resolvedMatch;
  }
  if (match.final === true) {
    return JSON.parse(JSON.stringify(match));
  }
}

module.exports = {
  humanHomeClubScoreCalc
};